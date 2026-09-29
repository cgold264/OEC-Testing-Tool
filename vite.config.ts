import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

function getLocalModel(): string {
  if (process.env.GROQ_MODEL) return process.env.GROQ_MODEL.replace(/^["']|["']$/g, '').trim();

  for (const filename of ['.dev.vars', '.env', '.env.local']) {
    try {
      if (fs.existsSync(filename)) {
        const text = fs.readFileSync(filename, 'utf-8');
        const match = text.match(/GROQ_MODEL=([^\r\n]+)/);
        if (match && match[1].trim()) {
          return match[1].replace(/^["']|["']$/g, '').trim();
        }
      }
    } catch {
      // ignore
    }
  }
  return 'openai/gpt-oss-120b';
}

function getLocalApiKey(): string {
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY.replace(/^["']|["']$/g, '').trim();
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.replace(/^["']|["']$/g, '').trim();

  for (const filename of ['.dev.vars', '.env', '.env.local']) {
    try {
      if (fs.existsSync(filename)) {
        const text = fs.readFileSync(filename, 'utf-8');
        const groqMatch = text.match(/GROQ_API_KEY=([^\r\n]+)/);
        if (groqMatch && groqMatch[1].trim()) {
          return groqMatch[1].replace(/^["']|["']$/g, '').trim();
        }
        const geminiMatch = text.match(/GEMINI_API_KEY=([^\r\n]+)/);
        if (geminiMatch && geminiMatch[1].trim()) {
          return geminiMatch[1].replace(/^["']|["']$/g, '').trim();
        }
      }
    } catch {
      // ignore
    }
  }
  return '';
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api-handler',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/')) {
            return next();
          }

          const apiKey =
            (req.headers['x-groq-key'] as string) ||
            (req.headers['x-api-key'] as string) ||
            (req.headers['x-gemini-key'] as string) ||
            getLocalApiKey();

          if (!apiKey) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error:
                  'Missing Groq API key. Add GROQ_API_KEY in .dev.vars or save it in the in-app Settings modal.'
              })
            );
            return;
          }

          // Parse POST body
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');

              if (req.url?.startsWith('/api/generate-scenario')) {
                const skeleton = parsed;
                const prompt = `
You are an expert Outdoor Emergency Care (OEC) instructor designing an official scenario for ski patrol evaluation.
Expand this skeleton into a complete, clinically realistic scenario card JSON object.

SKELETON:
- Location: ${skeleton.locationName}
- Weather: ${skeleton.defaultWeather}
- Logistics: ${skeleton.logistics}
- Mechanism of Injury / Illness: ${skeleton.mechanism}
- Patient: ${skeleton.patient.age}yo ${skeleton.patient.gender}, ${skeleton.patient.activity}
- Demeanor: ${skeleton.patient.demeanor}
- Primary Pathology: ${skeleton.pathology.primary}
- Secondary Pathology: ${skeleton.pathology.secondary || 'None'}
- Must-Do Rubric: ${skeleton.pathology.mustDo.join('; ')}
- Critical Fails: ${skeleton.pathology.criticalFails.join('; ')}

Respond ONLY with a valid JSON object matching:
{
  "id": "scenario-${Date.now()}",
  "title": "${skeleton.pathology.title}",
  "difficulty": "${skeleton.pathology.difficulty}",
  "location": "${skeleton.locationName}",
  "weather": "${skeleton.defaultWeather}",
  "logistics": "${skeleton.logistics}",
  "dispatchCall": "Authentic ski patrol radio dispatch call",
  "patientProfile": {
    "age": ${skeleton.patient.age},
    "gender": "${skeleton.patient.gender}",
    "activity": "${skeleton.patient.activity}",
    "demeanor": "${skeleton.patient.demeanor}"
  },
  "hiddenPathology": {
    "primary": "${skeleton.pathology.primary}",
    "secondary": "${skeleton.pathology.secondary || ''}",
    "initialVitals": {
      "hr": 110,
      "bp": "118/76",
      "rr": 22,
      "spo2": "92%",
      "skin": "pale, cool, clammy",
      "loc": "Alert / Verbal / Pain"
    },
    "physicalExam": {
      "headNeck": "Specific findings or 'Unremarkable'",
      "chest": "Specific breath sounds or 'Unremarkable'",
      "abdomen": "Soft/rigid, quadrants",
      "pelvis": "Stable or unstable",
      "extremities": "Deformities, pulses, motor function",
      "backSpine": "Step-offs or 'Unremarkable'"
    },
    "sampleHistory": {
      "signsSymptoms": "...",
      "allergies": "...",
      "medications": "...",
      "pastHistory": "...",
      "lastOralIntake": "...",
      "eventsLeading": "..."
    }
  },
  "scoringRubric": {
    "mustDo": ["...", "..."],
    "criticalFails": ["...", "..."]
  }
}
`;

                const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`
                  },
                  body: JSON.stringify({
                    model: (req.headers['x-groq-model'] as string) || getLocalModel(),
                    messages: [
                      {
                        role: 'system',
                        content:
                          'You are an expert Outdoor Emergency Care (OEC) instructor designing an official scenario for ski patrol evaluation. Respond ONLY with a valid JSON object matching the requested schema.'
                      },
                      {
                        role: 'user',
                        content: prompt
                      }
                    ],
                    response_format: { type: 'json_object' },
                    temperature: 0.3
                  })
                });

                if (!groqRes.ok) {
                  const errBody = await groqRes.text();
                  let errMsg = `Groq API error (${groqRes.status})`;
                  try {
                    const errObj = JSON.parse(errBody);
                    errMsg = errObj.error?.message || errBody;
                  } catch {
                    errMsg = errBody;
                  }
                  res.statusCode = groqRes.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: errMsg }));
                  return;
                }

                const data = await groqRes.json();
                const jsonText = data.choices?.[0]?.message?.content;
                const parsedCard = JSON.parse(jsonText || '{}');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ scenarioCard: parsedCard }));
                return;
              }

              if (req.url?.startsWith('/api/scenario-chat')) {
                const { scenarioCard, messages, isEvaluating } = parsed;

                let systemInstruction = `
You are the official Outdoor Emergency Care (OEC) Practical Scenario Evaluator and Patient Actor.
The user is an OEC candidate / ski patroller conducting a simulated field evaluation.

SCENARIO GROUND TRUTH (DO NOT REVEAL UNLESS USER PERFORMS THE SPECIFIC EXAM):
- Title: ${scenarioCard.title}
- Location: ${scenarioCard.location}
- Weather / Ambient: ${scenarioCard.weather}
- Logistics: ${scenarioCard.logistics}
- Patient: ${scenarioCard.patientProfile.age}yo ${scenarioCard.patientProfile.gender}, ${scenarioCard.patientProfile.activity}
- Patient Demeanor: ${scenarioCard.patientProfile.demeanor}
- Hidden Primary Injury/Condition: ${scenarioCard.hiddenPathology.primary}
- Hidden Secondary Injury: ${scenarioCard.hiddenPathology.secondary || 'None'}
- Baseline Vitals:
  * HR: ${scenarioCard.hiddenPathology.initialVitals.hr} bpm
  * BP: ${scenarioCard.hiddenPathology.initialVitals.bp} mmHg
  * RR: ${scenarioCard.hiddenPathology.initialVitals.rr} /min
  * SpO2: ${scenarioCard.hiddenPathology.initialVitals.spo2}
  * Skin: ${scenarioCard.hiddenPathology.initialVitals.skin}
  * LOC (AVPU): ${scenarioCard.hiddenPathology.initialVitals.loc}
- Detailed Exam Findings:
  * Head & Neck: ${scenarioCard.hiddenPathology.physicalExam.headNeck}
  * Chest: ${scenarioCard.hiddenPathology.physicalExam.chest}
  * Abdomen: ${scenarioCard.hiddenPathology.physicalExam.abdomen}
  * Pelvis: ${scenarioCard.hiddenPathology.physicalExam.pelvis}
  * Extremities: ${scenarioCard.hiddenPathology.physicalExam.extremities}
  * Back & Spine: ${scenarioCard.hiddenPathology.physicalExam.backSpine}
- SAMPLE History:
  * S: ${scenarioCard.hiddenPathology.sampleHistory.signsSymptoms}
  * A: ${scenarioCard.hiddenPathology.sampleHistory.allergies}
  * M: ${scenarioCard.hiddenPathology.sampleHistory.medications}
  * P: ${scenarioCard.hiddenPathology.sampleHistory.pastHistory}
  * L: ${scenarioCard.hiddenPathology.sampleHistory.lastOralIntake}
  * E: ${scenarioCard.hiddenPathology.sampleHistory.eventsLeading}
- Required Actions (Rubric): ${scenarioCard.scoringRubric.mustDo.join('; ')}
- Critical Fails: ${scenarioCard.scoringRubric.criticalFails.join('; ')}

FACILITATOR OPERATING RULES:
1. STRICT INFORMATION HIDING: Never volunteer symptoms, vitals, or injuries the candidate has not directly examined.
   - If they say "I check scene safety", tell them the hazards and mechanism, but DO NOT tell them what is wrong with the patient.
   - If they say "I check vitals", reveal the vitals clearly in format: [Pulse: ... | BP: ... | RR: ... | SpO2: ... | Skin: ...].
   - If they palpate or inspect an area, reveal only what is felt/seen there.
   - If they talk to the patient, speak in quotes matching the patient demeanor: "Patient: '...'".
2. Keep answers concise and clinical (2-4 sentences).
`;

                if (isEvaluating) {
                  systemInstruction += `
SPECIAL MODE: The candidate has finalized the scenario and called for transport/packaging.
You must now switch fully to EVALUATOR DEBRIEF MODE.
Provide a clear, structured OEC Debrief with:
1. OVERALL GRADE: Pass or Fail
2. STRENGTHS: Specific actions the candidate performed well
3. MISSED CRITERIA / DELAYS: Anything skipped or delayed
4. CRITICAL FAILS: Check if any critical fails were triggered
5. CLINICAL SUMMARY: The true pathology.
`;
                }

                const groqMessages = [
                  { role: 'system', content: systemInstruction },
                  ...(messages || []).map((m: { role: string; content: string }) => ({
                    role: m.role === 'user' ? 'user' : 'assistant',
                    content: m.content
                  }))
                ];

                const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`
                  },
                  body: JSON.stringify({
                    model: (req.headers['x-groq-model'] as string) || getLocalModel(),
                    messages: groqMessages,
                    temperature: isEvaluating ? 0.2 : 0.4,
                    max_tokens: 1200
                  })
                });

                if (!groqRes.ok) {
                  const errBody = await groqRes.text();
                  let errMsg = `Groq API error (${groqRes.status})`;
                  try {
                    const errObj = JSON.parse(errBody);
                    errMsg = errObj.error?.message || errBody;
                  } catch {
                    errMsg = errBody;
                  }
                  res.statusCode = groqRes.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: errMsg }));
                  return;
                }

                const data = await groqRes.json();
                const replyText =
                  data.choices?.[0]?.message?.content || 'No reply received from Groq.';

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply: replyText }));
                return;
              }

              next();
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : String(err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: msg }));
            }
          });
        });
      }
    }
  ],
  server: {
    port: 3000
  }
});

interface Env {
  GROQ_API_KEY?: string;
  GROQ_MODEL?: string;
  GEMINI_API_KEY?: string;
  [key: string]: unknown;
}

interface SkeletonPayload {
  locationName: string;
  defaultWeather: string;
  logistics: string;
  patient: {
    age: number;
    gender: string;
    activity: string;
    demeanor: string;
  };
  mechanism: string;
  pathology: {
    title: string;
    difficulty: 'Standard' | 'Challenging' | 'Critical';
    primary: string;
    secondary?: string;
    mustDo: string[];
    criticalFails: string[];
  };
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  try {
    const apiKey =
      context.request.headers.get('x-groq-key') ||
      context.request.headers.get('x-api-key') ||
      context.request.headers.get('x-gemini-key') ||
      context.env.GROQ_API_KEY ||
      context.env.GEMINI_API_KEY ||
      '';

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            'Missing Groq API Key. Please set GROQ_API_KEY in .dev.vars / Cloudflare Pages settings, or supply it in the app settings modal.'
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const skeleton: SkeletonPayload = await context.request.json();

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

CRITICAL GUIDELINES:
1. "dispatchCall": Authentic, brief ski patrol radio dispatch call. Must ONLY state the reported location and dispatch reason (e.g. 'Dispatch to Patroller: Respond to Lower Peak Glades for an injured skier'). NEVER include vitals, medical diagnosis, symptoms, or evacuation logistics.
2. "patientProfile.position": A clear description of strictly WHERE the patient was found and HOW they are physically positioned on scene upon arrival (e.g., 'lying supine on the snow with skis released', 'slumped on their left side against a tree in deep powder'). NEVER include vitals, injuries, medical diagnosis, or logistics.

OUTPUT REQUIREMENT:
Respond ONLY with a valid JSON object with the following exact keys and structure:
{
  "id": "scenario-${Date.now()}",
  "title": "${skeleton.pathology.title}",
  "difficulty": "${skeleton.pathology.difficulty}",
  "location": "${skeleton.locationName}",
  "weather": "${skeleton.defaultWeather}",
  "logistics": "${skeleton.logistics}",
  "dispatchCall": "Authentic concise ski patrol radio dispatch call without vitals or logistics",
  "patientProfile": {
    "age": ${skeleton.patient.age},
    "gender": "${skeleton.patient.gender}",
    "activity": "${skeleton.patient.activity}",
    "demeanor": "${skeleton.patient.demeanor}",
    "position": "How the patient was found positioned (e.g., supine in the snow, slumped against a tree)"
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
      "chest": "Specific breath sounds, chest expansion, or 'Unremarkable'",
      "abdomen": "Soft/rigid, quadrants, or 'Unremarkable'",
      "pelvis": "Stable or unstable, pain on compression",
      "extremities": "Deformities, pulses, motor function, or 'Unremarkable'",
      "backSpine": "Step-offs, tenderness, or 'Unremarkable'"
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

    const model =
      context.request.headers.get('x-groq-model') ||
      context.env.GROQ_MODEL ||
      'openai/gpt-oss-120b';

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
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

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      let errMsg = `Groq API returned error ${groqResponse.status}`;
      try {
        const errObj = JSON.parse(errText);
        errMsg = errObj.error?.message || errText;
      } catch {
        errMsg = errText;
      }
      return new Response(
        JSON.stringify({ error: errMsg }),
        { status: groqResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await groqResponse.json();
    const jsonText = data.choices?.[0]?.message?.content;

    if (!jsonText) {
      return new Response(JSON.stringify({ error: 'No JSON generated by Groq model' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const parsedCard = JSON.parse(jsonText);
    return new Response(JSON.stringify({ scenarioCard: parsedCard }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: `Internal server error: ${message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

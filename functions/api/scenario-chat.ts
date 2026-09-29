interface Env {
  GROQ_API_KEY?: string;
  GROQ_MODEL?: string;
  GEMINI_API_KEY?: string;
  [key: string]: unknown;
}

interface RequestBody {
  scenarioCard: {
    id: string;
    title: string;
    location: string;
    weather: string;
    logistics: string;
    dispatchCall: string;
    patientProfile: {
      age: number;
      gender: string;
      activity: string;
      demeanor: string;
    };
    hiddenPathology: {
      primary: string;
      secondary?: string;
      initialVitals: {
        hr: number;
        bp: string;
        rr: number;
        spo2: string;
        skin: string;
        loc: string;
      };
      physicalExam: {
        headNeck: string;
        chest: string;
        abdomen: string;
        pelvis: string;
        extremities: string;
        backSpine: string;
      };
      sampleHistory: {
        signsSymptoms: string;
        allergies: string;
        medications: string;
        pastHistory: string;
        lastOralIntake: string;
        eventsLeading: string;
      };
    };
    scoringRubric: {
      mustDo: string[];
      criticalFails: string[];
    };
  };
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  isEvaluating?: boolean;
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

    const body: RequestBody = await context.request.json();
    const { scenarioCard, messages, isEvaluating } = body;

    if (!scenarioCard || !messages) {
      return new Response(
        JSON.stringify({ error: 'Missing scenarioCard or messages in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build the system facilitator instruction
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
1. STRICT INFORMATION HIDING: You must NEVER volunteer symptoms, vitals, or injuries the candidate has not directly examined.
   - INITIAL SCENE & ARRIVAL: When the candidate arrives on scene or asks what they see, ONLY describe where the patient was found and how they are physically positioned (e.g. "You find the patient supine in the snow just off the trail edge"). NEVER provide vitals initially. DO NOT mention evacuation logistics, equipment, toboggans, or transport resources initially.
   - SCENE SAFETY: If they say "I check scene safety", tell them the immediate environmental hazards (e.g., snow conditions, tree wells, skier traffic) and apparent mechanism, but DO NOT volunteer what is wrong with the patient.
   - VITALS: NEVER provide vitals unless the candidate explicitly performs a vital signs assessment ("I take vitals", "I check pulse/BP/respirations"). Reveal vitals clearly in format: [Pulse: ... | BP: ... | RR: ... | SpO2: ... | Skin: ... | LOC: ...].
   - PHYSICAL EXAM: If they palpate or inspect a specific area (e.g. "I palpate the chest"), reveal only what is directly seen or felt in that specific anatomical area.
   - PATIENT INTERACTION: If they speak to the patient, respond in dialogue quotes matching the patient demeanor: "Patient: '...'".
2. CONCISE & CLINICAL: Keep answers crisp (1-3 sentences). Do not lecture, over-explain, or give hints.
3. ADHERE TO OEC PROTOCOLS: Reward BSI, manual c-spine stabilization, primary CAB/ABCDE, secondary DCAP-BTLS, and appropriate packaging/transport decisions.
4. STRICT OEC SCOPE OF PRACTICE: The candidate is a basic life support (BLS) OEC Technician, NOT a paramedic or doctor. DO NOT require, suggest, or allow ALS interventions (e.g., needle thoracostomy / chest decompression, intubation, IV/IO fluids, pushing cardiac meds other than assisting with nitro/aspirin/epi-pen). If a patient has a tension pneumothorax, the correct OEC treatment is high-flow oxygen, positioning, and rapid ALS transport, NOT a needle decompression.
`;

    if (isEvaluating) {
      systemInstruction += `
SPECIAL MODE: The candidate has finalized the scenario and called for transport/packaging.
You must now switch fully to EVALUATOR DEBRIEF MODE.
Provide a clear, structured OEC Debrief with:
1. OVERALL GRADE: Pass or Fail
2. STRENGTHS: Specific actions the candidate performed well (BSI, c-spine, primary assessment, timely vitals)
3. MISSED CRITERIA / DELAYS: Anything from the Must-Do rubric that was skipped or delayed
4. CRITICAL FAILS: Check if any critical fails were triggered
5. CLINICAL SUMMARY: The true pathology and how the candidate handled it.

EVALUATION RUBRIC (Based on standard Patient Assessment & BoCo Protocols):
- Scene Size-up: I'm #1 (Scene safety), What happened (MOI/NOI), None on me (PPE/BSI), Number of patients, Keep 'em alive (Resources).
- Primary Assessment: Introduce & Consent, LOR (AVPU), Fix major bleeding, ABCDE (Airway, Breathing, Circulation blood sweep/pulse/skin, Disability A+O, Environment).
- Secondary Assessment: Head to toe exam, Vitals (Time, LOR, BP, HR, RR, SpO2, Skin SCTM, Pupils PERRL), SAMPLE history, OPQRST for pain.
- Spinal Trauma / C-Collar Application (BoCo Standards): Evaluate if the candidate appropriately applied or omitted a cervical collar based on these criteria:
  * APPLY C-Collar if ANY of the following are present: Midline C/T/L spine tenderness, Neurologic complaints/deficits, Distracting injuries, Altered mentation (drugs/EtOH), Barrier to evaluate (language/developmental), Elderly with head injury, or Provider suspects spinal injury.
  * OMIT C-Collar if NONE of the above criteria are met AND no suspected spinal injury.
  * Check if they assessed for objective neurological deficit before and after spinal motion restriction.
`;
    }

    const groqMessages = [
      { role: 'system', content: systemInstruction },
      ...messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ];

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
        messages: groqMessages,
        temperature: isEvaluating ? 0.2 : 0.4,
        max_tokens: 1200
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
    const replyText =
      data.choices?.[0]?.message?.content ||
      'No response received from facilitator.';

    return new Response(
      JSON.stringify({ reply: replyText }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: `Internal server error: ${message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

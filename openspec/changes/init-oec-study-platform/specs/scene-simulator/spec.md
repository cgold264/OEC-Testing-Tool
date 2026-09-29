## ADDED Requirements

### Requirement: Coherent Mountain Scenario Generation
The scene simulator SHALL dynamically generate realistic OEC scenarios using a deterministic mountain coherence matrix (binding location to compatible mechanisms of injury, weather, and pathology) expanded via Google Gemini 2.0 Flash.

#### Scenario: User requests a random mountain scenario
- **WHEN** user selects "Start Random Scenario"
- **THEN** system selects a valid combination from the coherence matrix, requests Gemini 2.0 Flash to populate structured medical ground truth, and initializes the scene with dispatch information

#### Scenario: Preventing incompatible injury mechanics
- **WHEN** the generator selects "Day Lodge / Indoors" as location
- **THEN** mechanisms of injury involving high-speed tree strikes or avalanche burial are excluded by the matrix rules

### Requirement: Reactive Facilitator and Information Concealment
The LLM facilitator SHALL act as both on-scene evaluator and patient, strictly withholding diagnosis, vitals, and physical trauma findings until the user explicitly conducts the corresponding physical exam maneuver.

#### Scenario: User arrives on scene and checks safety
- **WHEN** user inputs "BSI, is my scene safe and what is my MOI?"
- **THEN** facilitator describes scene safety, environmental hazards, and observed mechanism of injury without volunteering patient responsiveness or vitals

#### Scenario: User assesses patient airway and responsiveness
- **WHEN** user inputs "I hold c-spine and check AVPU and airway"
- **THEN** facilitator provides patient's verbal/pain response level and airway status from the hidden scenario card

### Requirement: On-Demand Vitals and Patrol Clipboard
The scene simulator SHALL provide vital signs only upon explicit assessment request and maintain a live patrol clipboard tracking revealed clinical signs.

#### Scenario: User checks vital signs
- **WHEN** user inputs "Taking vitals: pulse, blood pressure, respirations, SpO2"
- **THEN** facilitator outputs the baseline vital readings, and the UI updates the collapsible Patrol Clipboard with the discovered values

### Requirement: Scenario Packaging, Transport, and Rubric Evaluation
The scene simulator SHALL evaluate the user's management against official OEC critical criteria upon transport decision, providing an itemized debrief.

#### Scenario: User calls for transport and concludes scenario
- **WHEN** user inputs packaging and transport commands (e.g., "Packaging patient in vacuum mattress into toboggan, urgent ALS intercept requested")
- **THEN** facilitator switches to Evaluator Mode, reviews the candidate's actions against the scenario's rubric, highlights any missed steps or critical fails, and displays a performance debrief

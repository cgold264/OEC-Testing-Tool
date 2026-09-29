import { Flashcard } from '../types/oec';
import { OEC_CHAPTER_KEY_TERMS } from './keyTerms';

export const CORE_FLASHCARDS: Flashcard[] = [
  // Domain 1: Foundations & Assessment
  {
    id: 'fc-01',
    chapter: 5,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'What are the 5 components of an OEC Scene Size-Up?',
    back: '1. BSI (Body Substance Isolation)\n2. Scene Safety (hazards, weather, overhead terrain)\n3. Mechanism of Injury (MOI) or Nature of Illness (NOI)\n4. Number of Patients\n5. Need for Additional Resources (patrol, toboggans, ALS/EMS)',
    tags: ['assessment', 'scene-sizeup', 'core']
  },
  {
    id: 'fc-02',
    chapter: 5,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'What does the acronym DCAP-BTLS stand for in the secondary trauma exam?',
    back: '• Deformities\n• Contusions\n• Abrasions\n• Punctures / Penetrations\n• Burns\n• Tenderness\n• Lacerations\n• Swelling',
    tags: ['trauma', 'secondary-exam', 'mnemonic']
  },
  {
    id: 'fc-03',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'What does the SAMPLE history mnemonic represent?',
    back: '• S: Signs and Symptoms\n• A: Allergies\n• M: Medications\n• P: Past pertinent medical history\n• L: Last oral intake (food/liquid)\n• E: Events leading up to the injury/illness',
    tags: ['history', 'assessment', 'mnemonic']
  },
  {
    id: 'fc-04',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'What does the OPQRST mnemonic assess in medical pain?',
    back: '• O: Onset (sudden vs gradual)\n• P: Provocation / Palliation (what makes it better or worse)\n• Q: Quality (sharp, dull, tearing, crushing)\n• R: Radiation (does pain travel anywhere)\n• S: Severity (1 to 10 scale)\n• T: Time (how long has this been going on)',
    tags: ['medical', 'assessment', 'pain']
  },
  {
    id: 'fc-05',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'What are the normal adult vital sign ranges in OEC?',
    back: '• Pulse (Heart Rate): 60 – 100 bpm, regular & strong\n• Respiration Rate: 12 – 20 breaths/min, unlabored\n• Blood Pressure: Systolic 100–120 / Diastolic 60–80 mmHg\n• SpO2: 95% – 100% on ambient air\n• Skin: Pink, warm, and dry\n• Pupils: PEARL (Pupils Equal And Reactive to Light)',
    tags: ['vitals', 'baseline']
  },

  // Domain 2: Trauma & Shock
  {
    id: 'fc-06',
    chapter: 10,
    domain: 'Domain 2: Trauma & Shock',
    front: 'What are the classic early vs. late signs of Hypovolemic Shock?',
    back: 'Early (Compensated):\n• Restlessness, anxiety\n• Tachycardia (elevated heart rate)\n• Tachypnea (rapid breathing)\n• Pale, cool, clammy skin\n• Normal or slightly elevated BP\n\nLate (Decompensated):\n• Hypotension (falling blood pressure)\n• Altered mental status / lethargy\n• Weak/absent peripheral pulses\n• Cyanosis / mottled skin',
    tags: ['shock', 'trauma']
  },
  {
    id: 'fc-07',
    chapter: 14,
    domain: 'Domain 2: Trauma & Shock',
    front: 'What defines a Flail Chest and how is it initially managed?',
    back: 'Definition: Two or more adjacent ribs fractured in two or more places, creating a detached, freely moving segment.\n\nSigns: Paradoxical chest movement (segment sinks during inhalation, bulges during exhalation).\n\nManagement: High-flow O2, assist ventilations if inadequate, stabilize the segment manually or with bulky dressing/pillow, rapid transport in position of comfort.',
    tags: ['chest-trauma', 'trauma']
  },
  {
    id: 'fc-08',
    chapter: 14,
    domain: 'Domain 2: Trauma & Shock',
    front: 'What are the hallmark signs of a Tension Pneumothorax?',
    back: '1. Severe dyspnea / respiratory distress\n2. Diminished or absent breath sounds on affected side\n3. Tracheal deviation away from the injured side (late sign)\n4. Jugular Venous Distension (JVD)\n5. Subcutaneous emphysema\n6. Signs of progressive decompensated shock (hypotension, tachycardia)',
    tags: ['chest-trauma', 'critical']
  },
  {
    id: 'fc-09',
    chapter: 16,
    domain: 'Domain 2: Trauma & Shock',
    front: 'What is Cushing\'s Triad and what does it indicate?',
    back: 'Indicates severe Increased Intracranial Pressure (ICP) / Brain Herniation:\n1. Hypertension with widening pulse pressure (e.g. 180/60)\n2. Bradycardia (slow, bounding pulse)\n3. Irregular or Cheyne-Stokes respirations',
    tags: ['head-trauma', 'neurology']
  },

  // Domain 3: Orthopedics & Splinting
  {
    id: 'fc-10',
    chapter: 20,
    domain: 'Domain 3: Orthopedics & Splinting',
    front: 'What must always be assessed before and after applying any splint?',
    back: 'CSM (Circulation, Sensation, and Motor function) in all distal extremities.\n• C: Radial or Dorsalis Pedis/Posterior Tibial pulse & capillary refill\n• S: Can the patient feel which toe/finger is touched?\n• M: Can the patient wiggle fingers/toes?',
    tags: ['splinting', 'orthopedics', 'csm']
  },
  {
    id: 'fc-11',
    chapter: 22,
    domain: 'Domain 3: Orthopedics & Splinting',
    front: 'What is the indication for a Traction Splint (e.g., Sager Splint)?',
    back: 'Indication: An isolated, closed, mid-shaft femur fracture.\n\nContraindications:\n• Fracture close to or involving the knee\n• Fracture of hip or pelvis\n• Lower leg or ankle injury on the same extremity\n• Open femur fracture with partial amputation',
    tags: ['splinting', 'femur', 'traction']
  },

  // Domain 4: Medical Emergencies
  {
    id: 'fc-12',
    chapter: 24,
    domain: 'Domain 4: Medical Emergencies',
    front: 'What are the administration criteria for Aspirin in suspected Acute Coronary Syndrome (ACS)?',
    back: '• Dose: 160 – 325 mg chewable baby aspirin (non-enteric coated)\n• Criteria: Adult complaining of nontraumatic chest pain/discomfort suggestive of cardiac origin\n• Contraindications: Known aspirin allergy, active gastrointestinal bleeding, history of bleeding disorders, patient cannot swallow',
    tags: ['cardiac', 'pharmacology']
  },
  {
    id: 'fc-13',
    chapter: 25,
    domain: 'Domain 4: Medical Emergencies',
    front: 'Explain the Cincinnati Prehospital Stroke Scale (CPSS) / FAST.',
    back: '• Facial Droop: Have patient smile or show teeth (normal: both sides move equally)\n• Arm Drift: Patient closes eyes and holds both arms straight out palms up for 10 sec (normal: both arms stay up)\n• Speech: "You can\'t teach an old dog new tricks" (normal: clear speech, no slurring)\n• Time: Note the exact time last known normal and initiate rapid transport',
    tags: ['stroke', 'neurology']
  },
  {
    id: 'fc-14',
    chapter: 27,
    domain: 'Domain 4: Medical Emergencies',
    front: 'What distinguishes an Allergic Reaction from Anaphylaxis?',
    back: 'Allergic Reaction: Localized hives, itching, mild swelling without respiratory compromise or systemic shock.\n\nAnaphylaxis (Systemic / Life-threatening):\n• Involves TWO or more body systems (e.g. skin hives + respiratory wheezing/stridor, or skin + hypotension/GI cramping)\n• Immediate treatment: Epinephrine auto-injector (0.3 mg adult, 0.15 mg pediatric) IM into lateral mid-thigh + high-flow O2.',
    tags: ['anaphylaxis', 'medical', 'epipen']
  },

  // Domain 5: Environmental & Wilderness
  {
    id: 'fc-15',
    chapter: 30,
    domain: 'Domain 5: Environmental & Wilderness',
    front: 'Describe the stages of Hypothermia based on core temperature and symptoms.',
    back: '• Mild (95°F–90°F / 35°C–32°C): Vigorous shivering, "umbles" (stumbles, mumbles, fumbles, grumbles), alert.\n• Moderate (90°F–82°F / 32°C–28°C): Shivering stops, progressive confusion/apathy, muscle rigidity, dilated pupils.\n• Severe (< 82°F / < 28°C): Unresponsive, bradycardia, barely detectable breathing, high risk of ventricular fibrillation (handle very gently!)',
    tags: ['cold', 'hypothermia', 'environmental']
  },
  {
    id: 'fc-16',
    chapter: 30,
    domain: 'Domain 5: Environmental & Wilderness',
    front: 'What are the rules for packaging a severely hypothermic patient?',
    back: '1. Handle extremely gently (rough movement can trigger fatal ventricular fibrillation)\n2. Prevent further heat loss: remove wet clothes, create a multi-layer vapor barrier (hypothermia wrap / "burrito" with tarps and sleeping bags)\n3. Insulate patient from the cold snow/toboggan surface\n4. Apply gentle active external warming packs to thorax/groin/axilla (never directly to bare skin)\n5. Do NOT allow patient to walk or exert themselves',
    tags: ['cold', 'packaging', 'hypothermia']
  },
  {
    id: 'fc-17',
    chapter: 32,
    domain: 'Domain 5: Environmental & Wilderness',
    front: 'What are the differences between HAPE and HACE?',
    back: 'HAPE (High Altitude Pulmonary Edema):\n• Non-cardiogenic fluid in lungs\n• Symptoms: Extreme breathlessness at rest, persistent cough with pink frothy sputum, rales/crackles, cyanosis\n\nHACE (High Altitude Cerebral Edema):\n• Fluid swelling in brain\n• Symptoms: Severe headache, ataxia (loss of coordination / inability to walk tandem heel-to-toe), confusion, hallucinations, coma\n\nDefinitive Field Treatment for both: IMMEDIATE DESCENT to lower altitude + High-Flow O2.',
    tags: ['altitude', 'environmental']
  },

  // Domain 6: Outdoor Special Ops
  {
    id: 'fc-18',
    chapter: 34,
    domain: 'Domain 6: Outdoor Special Operations',
    front: 'When loading and transporting a patient in a snow toboggan, what is the default head orientation?',
    back: '• Default: Head uphill (feet downhill) for most trauma and medical patients to maintain airway visibility and reduce intracranial pressure.\n• Exception: Patients in hypovolemic shock without head injury may occasionally be transported head downhill if terrain is very steep, or position of comfort for respiratory distress (semi-Fowler\'s). Always maintain continuous airway monitoring.',
    tags: ['toboggan', 'transport', 'patrol']
  },
  {
    id: 'fc-19',
    chapter: 36,
    domain: 'Domain 6: Outdoor Special Operations',
    front: 'Explain the START Triage algorithm steps for Mass-Casualty Incidents.',
    back: '1. Ability to Walk: Any walking wounded = GREEN (Minor)\n2. Respirations:\n   • None $\\rightarrow$ open airway $\\rightarrow$ Still none = BLACK (Expectant/Deceased)\n   • None $\\rightarrow$ opens airway $\\rightarrow$ breathes $\\rightarrow$ RED (Immediate)\n   • > 30 breaths/min = RED (Immediate)\n   • < 30 breaths/min $\\rightarrow$ check Perfusion\n3. Perfusion (Radial Pulse / Cap Refill):\n   • Absent radial pulse or Cap Refill > 2 sec = RED (Immediate)\n   • Radial pulse present $\\rightarrow$ check Mental Status\n4. Mental Status:\n   • Cannot follow simple commands = RED (Immediate)\n   • Can follow simple commands = YELLOW (Delayed)',
    tags: ['triage', 'mci', 'start']
  }
];

export const CHAPTER_KEY_TERMS: Flashcard[] = OEC_CHAPTER_KEY_TERMS;

// Master flashcards pool: Exclusively the 53 curated end-of-chapter questions/terms
export const ALL_FLASHCARDS: Flashcard[] = OEC_CHAPTER_KEY_TERMS;

export const SAMPLE_FLASHCARDS = ALL_FLASHCARDS;

import { Flashcard } from '../types/oec';

export const OEC_CHAPTER_KEY_TERMS: Flashcard[] = [
  // CHAPTER 1: Introduction to OEC & Ski Patrol
  {
    id: 'kt-ch1-01',
    chapter: 1,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Duty to Act',
    back: 'A legal or contractual obligation to provide emergency care to an ill or injured person while on duty as a member of an emergency service (such as ski patrol).',
    tags: ['key-term', 'legal', 'ch1']
  },
  {
    id: 'kt-ch1-02',
    chapter: 1,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Standard of Care',
    back: 'The level, type, and quality of care that a reasonably prudent person with similar training and in similar circumstances would provide.',
    tags: ['key-term', 'legal', 'ch1']
  },
  {
    id: 'kt-ch1-03',
    chapter: 1,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Abandonment',
    back: 'The unilateral termination of care by the rescuer without the patient\'s consent and without transferring care to an equally or higher-trained healthcare provider.',
    tags: ['key-term', 'legal', 'ch1']
  },
  {
    id: 'kt-ch1-04',
    chapter: 1,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Expressed vs. Implied Consent',
    back: '• Expressed Consent: Permission given verbally or via nonverbal gesture by an informed, competent adult.\n• Implied Consent: Legal presumption that an unresponsive, delusional, intoxicated, or minor patient would consent to life-saving emergency care.',
    tags: ['key-term', 'legal', 'ch1']
  },
  {
    id: 'kt-ch1-05',
    chapter: 1,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Battery & Assault',
    back: '• Assault: Placing a person in fear of imminent bodily harm without consent.\n• Battery: Unlawful physical touching of a person without their consent (e.g. splinting a conscious, competent adult who refused care).',
    tags: ['key-term', 'legal', 'ch1']
  },
  {
    id: 'kt-ch1-06',
    chapter: 1,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Good Samaritan Laws',
    back: 'State laws designed to protect individuals from liability when rendering emergency care in good faith, without gross negligence, and without expectation of compensation.',
    tags: ['key-term', 'legal', 'ch1']
  },

  // CHAPTER 2: Emergency Medical Care Systems
  {
    id: 'kt-ch2-01',
    chapter: 2,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Direct (Online) vs. Indirect (Offline) Medical Oversight',
    back: '• Direct (Online): Real-time medical orders provided directly by a physician via radio or phone.\n• Indirect (Offline): Protocols, standing orders, training curricula, and quality improvement approved by the medical director in advance.',
    tags: ['key-term', 'ems', 'ch2']
  },
  {
    id: 'kt-ch2-02',
    chapter: 2,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Scope of Practice',
    back: 'The boundary of medical care that an OEC Technician is legally permitted and trained to perform in their jurisdiction under their medical advisor.',
    tags: ['key-term', 'ems', 'ch2']
  },

  // CHAPTER 3: Anatomy, Directional Terms & Positions
  {
    id: 'kt-ch3-01',
    chapter: 3,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Anatomical Position',
    back: 'Standing erect, facing forward, arms at sides with palms turned forward, thumbs pointing away from body, legs straight with feet forward.',
    tags: ['key-term', 'anatomy', 'ch3']
  },
  {
    id: 'kt-ch3-02',
    chapter: 3,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Anatomical Directions: Proximal vs. Distal',
    back: '• Proximal: Closer to the trunk or point of attachment (e.g., elbow is proximal to the wrist).\n• Distal: Farther from the trunk or point of attachment (e.g., ankle is distal to the knee).',
    tags: ['key-term', 'anatomy', 'ch3']
  },
  {
    id: 'kt-ch3-03',
    chapter: 3,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Anatomical Directions: Medial vs. Lateral',
    back: '• Medial: Closer to the midline of the body.\n• Lateral: Farther away from the midline of the body.',
    tags: ['key-term', 'anatomy', 'ch3']
  },
  {
    id: 'kt-ch3-04',
    chapter: 3,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Patient Positions: Supine vs. Prone vs. Fowler\'s',
    back: '• Supine: Lying flat on the back facing upward.\n• Prone: Lying flat on the stomach facing downward.\n• Fowler\'s: Sitting upright (45°–90° angle), often used for respiratory distress.',
    tags: ['key-term', 'anatomy', 'ch3']
  },

  // CHAPTER 4: Anatomy & Physiology / Rescue Basics
  {
    id: 'kt-ch4-01',
    chapter: 4,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Homeostasis & Perfusion',
    back: '• Homeostasis: The body\'s dynamic state of balance in internal conditions (temperature, pH, fluid levels).\n• Perfusion: The constant delivery of oxygen and nutrients to tissues and organs via blood circulation, coupled with waste removal.',
    tags: ['key-term', 'physiology', 'ch4']
  },
  {
    id: 'kt-ch4-02',
    chapter: 4,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Aerobic vs. Anaerobic Metabolism',
    back: '• Aerobic: Cellular energy production requiring oxygen; produces abundant ATP and harmless CO2 and water.\n• Anaerobic: Emergency metabolism when oxygen is lacking; produces very little ATP and creates toxic lactic acid.',
    tags: ['key-term', 'physiology', 'ch4']
  },

  // CHAPTER 5: Patient Assessment & Scene Size-up
  {
    id: 'kt-ch5-01',
    chapter: 5,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'BSI (Body Substance Isolation)',
    back: 'Precautions taken to protect health care workers from exposure to potentially infectious blood and body fluids (gloves, goggles, masks, gowns).',
    tags: ['key-term', 'assessment', 'ch5']
  },
  {
    id: 'kt-ch5-02',
    chapter: 5,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Mechanism of Injury (MOI) vs. Nature of Illness (NOI)',
    back: '• MOI: The physical forces, kinematics, and energy that caused traumatic injury (e.g. tree strike, fall from lift).\n• NOI: The medical condition or disease process causing the patient\'s symptoms (e.g. chest pain, diabetic crisis).',
    tags: ['key-term', 'assessment', 'ch5']
  },
  {
    id: 'kt-ch5-03',
    chapter: 5,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'AVPU Scale',
    back: 'Rapid mental status assessment:\n• A: Alert (spontaneously awake, oriented)\n• V: Verbal (responds to voice/verbal stimuli)\n• P: Pain (responds only to painful stimuli)\n• U: Unresponsive (no response to voice or pain)',
    tags: ['key-term', 'assessment', 'ch5']
  },
  {
    id: 'kt-ch5-04',
    chapter: 5,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Primary Assessment (ABCDE)',
    back: 'A systematic check to identify and immediately treat life-threatening conditions:\n• Airway (with c-spine control)\n• Breathing (rate, depth, effort)\n• Circulation (pulses, bleeding, skin)\n• Disability (neurologic status / AVPU)\n• Exposure / Environment (protect from cold)',
    tags: ['key-term', 'assessment', 'ch5']
  },

  // CHAPTER 6: Secondary Assessment & Vital Signs
  {
    id: 'kt-ch6-01',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'DCAP-BTLS',
    back: 'Trauma mnemonic for secondary physical exam findings:\nDeformities, Contusions, Abrasions, Punctures/Penetrations, Burns, Tenderness, Lacerations, Swelling.',
    tags: ['key-term', 'assessment', 'ch6']
  },
  {
    id: 'kt-ch6-02',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'SAMPLE History',
    back: 'Medical history mnemonic:\nSigns & Symptoms, Allergies, Medications, Pertinent past medical history, Last oral intake, Events leading up to illness/injury.',
    tags: ['key-term', 'assessment', 'ch6']
  },
  {
    id: 'kt-ch6-03',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'OPQRST Pain Assessment',
    back: 'Mnemonic for exploring pain:\nOnset, Provocation/Palliation, Quality, Radiation, Severity (1-10), Time (duration).',
    tags: ['key-term', 'assessment', 'ch6']
  },
  {
    id: 'kt-ch6-04',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Systolic vs. Diastolic Blood Pressure',
    back: '• Systolic: Peak pressure exerted against arterial walls during cardiac contraction (ventricular systole).\n• Diastolic: Residual pressure in arteries during ventricular relaxation/filling.',
    tags: ['key-term', 'vitals', 'ch6']
  },
  {
    id: 'kt-ch6-05',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Tachycardia vs. Bradycardia',
    back: '• Tachycardia: Heart rate abnormally elevated above 100 bpm in an adult.\n• Bradycardia: Heart rate abnormally slow below 60 bpm in an adult.',
    tags: ['key-term', 'vitals', 'ch6']
  },

  // CHAPTER 7: Airway Management & Oxygen
  {
    id: 'kt-ch7-01',
    chapter: 7,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Head-Tilt Chin-Lift vs. Jaw-Thrust',
    back: '• Head-Tilt Chin-Lift: Standard maneuver to open airway in non-trauma medical patients.\n• Modified Jaw-Thrust: Technique to open airway in patients with suspected cervical spine injury without moving the neck.',
    tags: ['key-term', 'airway', 'ch7']
  },
  {
    id: 'kt-ch7-02',
    chapter: 7,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Oropharyngeal Airway (OPA) vs. Nasopharyngeal Airway (NPA)',
    back: '• OPA: Rigid plastic device inserted into mouth of UNRESPONSIVE patient without a gag reflex.\n• NPA: Soft rubber tube inserted through nostril; can be used in semi-conscious patients who still maintain a gag reflex.',
    tags: ['key-term', 'airway', 'ch7']
  },
  {
    id: 'kt-ch7-03',
    chapter: 7,
    domain: 'Domain 1: Foundations & Assessment',
    front: 'Non-Rebreather Mask (NRB) vs. Nasal Cannula',
    back: '• NRB: Oxygen delivery mask with reservoir bag delivering up to 90% O2 at 10–15 LPM for significant hypoxia.\n• Nasal Cannula: Two-prong device delivering 24%–44% O2 at 1–6 LPM for mild hypoxia or patients intolerant of a mask.',
    tags: ['key-term', 'oxygen', 'ch7']
  },

  // CHAPTER 10: Shock Management
  {
    id: 'kt-ch10-01',
    chapter: 10,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Compensated vs. Decompensated Shock',
    back: '• Compensated Shock: Early stage where body maintains normal BP through tachycardia, vasoconstriction, and tachypnea.\n• Decompensated Shock: Late stage where compensatory mechanisms fail; characterized by hypotension (systolic BP < 90), altered mental status, and weak/absent peripheral pulses.',
    tags: ['key-term', 'shock', 'ch10']
  },
  {
    id: 'kt-ch10-02',
    chapter: 10,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Hypovolemic Shock',
    back: 'Shock caused by catastrophic loss of intravascular blood volume or fluids (e.g. external bleeding, pelvic/femur fractures, or severe dehydration/burns).',
    tags: ['key-term', 'shock', 'ch10']
  },
  {
    id: 'kt-ch10-03',
    chapter: 10,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Cardiogenic vs. Neurogenic Shock',
    back: '• Cardiogenic: Pump failure where the heart is damaged (e.g. large myocardial infarction) and cannot circulate blood.\n• Neurogenic: Distributive shock caused by high spinal cord damage disrupting sympathetic tone, causing widespread vasodilation, hypotension with paradoxically normal/slow heart rate and warm, dry skin.',
    tags: ['key-term', 'shock', 'ch10']
  },

  // CHAPTER 11: Bleeding Control
  {
    id: 'kt-ch11-01',
    chapter: 11,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Arterial vs. Venous Bleeding',
    back: '• Arterial: Bright red, spurting under high pressure pulsating with heartbeats; life-threatening.\n• Venous: Dark red, steady flowing blood under lower pressure.',
    tags: ['key-term', 'bleeding', 'ch11']
  },
  {
    id: 'kt-ch11-02',
    chapter: 11,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Tourniquet Protocol',
    back: 'Applied 2–3 inches proximal to severe life-threatening extremity hemorrhage (never over a joint). Tighten until bleeding stops and distal pulse vanishes. Note the exact time of application on forehead/tourniquet.',
    tags: ['key-term', 'bleeding', 'ch11']
  },

  // CHAPTER 14: Thoracic Trauma
  {
    id: 'kt-ch14-01',
    chapter: 14,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Tension Pneumothorax',
    back: 'A one-way valve leak in the pleural space trapping air under positive pressure, collapsing the lung and shifting the mediastinum, kinking the vena cava and causing rapid cardiac arrest.',
    tags: ['key-term', 'chest', 'ch14']
  },
  {
    id: 'kt-ch14-02',
    chapter: 14,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Flail Chest & Paradoxical Motion',
    back: 'Fracture of two or more adjacent ribs in two or more places creating a free-floating chest wall segment that moves paradoxically (sinks during inhalation, bulges during exhalation).',
    tags: ['key-term', 'chest', 'ch14']
  },
  {
    id: 'kt-ch14-03',
    chapter: 14,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Pericardial Tamponade & Beck\'s Triad',
    back: 'Blood accumulating in the pericardial sac compressing the heart. Beck\'s Triad signs:\n1. Muffled heart sounds\n2. Jugular venous distension (JVD)\n3. Hypotension with narrowing pulse pressure',
    tags: ['key-term', 'chest', 'ch14']
  },

  // CHAPTER 16: Head & Spine Injuries
  {
    id: 'kt-ch16-01',
    chapter: 16,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Cushing\'s Triad',
    back: 'Life-threatening signs of severely increased intracranial pressure (ICP) / brainstem herniation:\n1. Hypertension with widening pulse pressure\n2. Bradycardia (slow, bounding pulse)\n3. Irregular or Cheyne-Stokes respirations',
    tags: ['key-term', 'head', 'ch16']
  },
  {
    id: 'kt-ch16-02',
    chapter: 16,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Basilar Skull Fracture Signs',
    back: 'Fracture of the base of the cranium. Hallmark signs:\n• Battle\'s sign (ecchymosis behind ears over mastoid process)\n• Raccoon eyes (periorbital ecchymosis)\n• CSF leakage from nose (rhinorrhea) or ears (otorrhea)',
    tags: ['key-term', 'head', 'ch16']
  },
  {
    id: 'kt-ch16-03',
    chapter: 16,
    domain: 'Domain 2: Trauma & Shock',
    front: 'Epidural vs. Subdural Hematoma',
    back: '• Epidural Hematoma: Arterial bleeding between skull and dura (often middle meningeal artery); characterized by initial loss of consciousness, brief "lucid interval", then rapid deterioration into coma.\n• Subdural Hematoma: Venous bleeding between dura and arachnoid; slower onset of symptoms (hours to days).',
    tags: ['key-term', 'head', 'ch16']
  },

  // CHAPTER 20-22: Orthopedics & Splinting
  {
    id: 'kt-ch20-01',
    chapter: 20,
    domain: 'Domain 3: Orthopedics & Splinting',
    front: 'Sprain vs. Strain',
    back: '• Sprain: Tearing or stretching injury to a LIGAMENT (connecting bone to bone).\n• Strain: Tearing or stretching injury to a MUSCLE or TENDON (connecting muscle to bone).',
    tags: ['key-term', 'ortho', 'ch20']
  },
  {
    id: 'kt-ch20-02',
    chapter: 20,
    domain: 'Domain 3: Orthopedics & Splinting',
    front: 'CSM Check',
    back: 'Circulation, Sensation, and Motor function. Must be assessed in all four extremities immediately before AND after applying any splint, bandage, or immobilization device.',
    tags: ['key-term', 'ortho', 'ch20']
  },
  {
    id: 'kt-ch22-01',
    chapter: 22,
    domain: 'Domain 3: Orthopedics & Splinting',
    front: 'Traction Splint (Sager)',
    back: 'Mechanical device that pulls in-line traction on an isolated, closed, mid-shaft femur fracture to reduce thigh muscle spasms, restore blood flow, and align bone fragments.',
    tags: ['key-term', 'splinting', 'ch22']
  },

  // CHAPTER 24: Cardiovascular Emergencies
  {
    id: 'kt-ch24-01',
    chapter: 24,
    domain: 'Domain 4: Medical Emergencies',
    front: 'Acute Coronary Syndrome (ACS) & Angina vs. AMI',
    back: '• Angina Pectoris: Transient cardiac ischemia during exertion that resolves with rest or sublingual nitroglycerin.\n• Acute Myocardial Infarction (AMI): Actual cell death (necrosis) of heart muscle caused by persistent coronary artery occlusion; not relieved by rest.',
    tags: ['key-term', 'cardiac', 'ch24']
  },
  {
    id: 'kt-ch24-02',
    chapter: 24,
    domain: 'Domain 4: Medical Emergencies',
    front: 'Nitroglycerin Protocol',
    back: 'Vasodilator for cardiac chest pain. 0.4 mg sublingual tablet or spray.\nContraindications: Systolic BP < 100 mmHg, or use of erectile dysfunction medications (Viagra, Cialis) within 24–48 hours.',
    tags: ['key-term', 'cardiac', 'ch24']
  },

  // CHAPTER 25: Neurological & Stroke
  {
    id: 'kt-ch25-01',
    chapter: 25,
    domain: 'Domain 4: Medical Emergencies',
    front: 'Ischemic vs. Hemorrhagic Stroke',
    back: '• Ischemic Stroke (87%): Brain vessel blocked by a thrombus or embolus, cutting off blood flow.\n• Hemorrhagic Stroke (13%): Ruptured blood vessel (aneurysm) bleeding into brain tissue; sudden "worst headache of life".',
    tags: ['key-term', 'neuro', 'ch25']
  },
  {
    id: 'kt-ch25-02',
    chapter: 25,
    domain: 'Domain 4: Medical Emergencies',
    front: 'FAST Stroke Assessment',
    back: '• Facial Droop (smile)\n• Arm Drift (hold arms up palms forward 10 sec)\n• Speech difficulty (repeat a phrase)\n• Time last known normal (critical for thrombolytic window)',
    tags: ['key-term', 'stroke', 'ch25']
  },

  // CHAPTER 26: Altered Mental Status & Diabetes
  {
    id: 'kt-ch26-01',
    chapter: 26,
    domain: 'Domain 4: Medical Emergencies',
    front: 'Hypoglycemia vs. Hyperglycemia',
    back: '• Hypoglycemia (Insulin shock): Low blood glucose (< 70 mg/dL); rapid onset, cold/clammy skin, confusion, seizures.\n• Hyperglycemia (DKA): High blood glucose (> 250 mg/dL); slow onset over days, warm/dry skin, fruity breath, Kussmaul breathing.',
    tags: ['key-term', 'diabetes', 'ch26']
  },

  // CHAPTER 27: Allergic Reactions & Anaphylaxis
  {
    id: 'kt-ch27-01',
    chapter: 27,
    domain: 'Domain 4: Medical Emergencies',
    front: 'Anaphylaxis vs. Localized Allergic Reaction',
    back: 'Anaphylaxis is systemic and life-threatening involving TWO or more organ systems (e.g. hives + airway constriction / stridor / hypotension). Treat with immediate intramuscular Epinephrine.',
    tags: ['key-term', 'allergy', 'ch27']
  },

  // CHAPTER 30: Cold Injuries & Hypothermia
  {
    id: 'kt-ch30-01',
    chapter: 30,
    domain: 'Domain 5: Environmental & Wilderness',
    front: 'Hypothermia Stages & Core Temperatures',
    back: '• Mild (95°F–90°F / 35°C–32°C): Vigorous shivering, stumbles/mumbles.\n• Moderate (90°F–82°F / 32°C–28°C): Shivering stops, apathy, dilated pupils.\n• Severe (< 82°F / < 28°C): Unresponsive, extreme v-fib risk, death-like state.',
    tags: ['key-term', 'cold', 'ch30']
  },
  {
    id: 'kt-ch30-02',
    chapter: 30,
    domain: 'Domain 5: Environmental & Wilderness',
    front: 'Afterdrop (Hypothermia)',
    back: 'Continued drop in core body temperature after rescue, caused by cold, acidotic blood returning from extremities to the warm heart. Prevented by gentle handling and trunk-only rewarming.',
    tags: ['key-term', 'cold', 'ch30']
  },
  {
    id: 'kt-ch30-03',
    chapter: 30,
    domain: 'Domain 5: Environmental & Wilderness',
    front: 'Frostbite (Superficial vs. Deep)',
    back: '• Frostnip/Superficial: Numb, waxy, yellow/white skin with soft underlying tissue.\n• Deep Frostbite: Frozen solid, rock-hard tissue with ice crystal formation. Never rewarm if refreezing is possible.',
    tags: ['key-term', 'cold', 'ch30']
  },

  // CHAPTER 32: High-Altitude Illnesses
  {
    id: 'kt-ch32-01',
    chapter: 32,
    domain: 'Domain 5: Environmental & Wilderness',
    front: 'AMS (Acute Mountain Sickness)',
    back: 'Altitude illness usually occurring above 8,000 ft: throbbing headache, fatigue, dizziness, nausea, and insomnia. Treatment: rest, hydration, do not ascend further.',
    tags: ['key-term', 'altitude', 'ch32']
  },
  {
    id: 'kt-ch32-02',
    chapter: 32,
    domain: 'Domain 5: Environmental & Wilderness',
    front: 'HAPE vs. HACE',
    back: '• HAPE (Pulmonary Edema): Fluid in lungs; persistent cough, pink frothy sputum, cyanosis, rales.\n• HACE (Cerebral Edema): Fluid in brain; ataxia (drunk-like gait), severe confusion, hallucinations, coma.\nDefinitive field cure: IMMEDIATE DESCENT + high-flow O2.',
    tags: ['key-term', 'altitude', 'ch32']
  },

  // CHAPTER 34-36: Special Operations & START Triage
  {
    id: 'kt-ch34-01',
    chapter: 34,
    domain: 'Domain 6: Outdoor Special Operations',
    front: 'Toboggan Packaging Protocols',
    back: 'Head-uphill transport for majority of cases to protect airway. Utilize multi-layer tarp/sleeping bag "burrito" wrap for cold protection and chain brake / tail-rope on steep pitches.',
    tags: ['key-term', 'toboggan', 'ch34']
  },
  {
    id: 'kt-ch36-01',
    chapter: 36,
    domain: 'Domain 6: Outdoor Special Operations',
    front: 'START Triage Colors & Meanings',
    back: '• Green (Minor): "Walking wounded"\n• Yellow (Delayed): Serious, non-life-threatening\n• Red (Immediate): Life-threatening (airway, RR > 30, absent radial pulse, or unable to follow commands)\n• Black (Expectant/Deceased): Apneic after manual airway opening, or pulseless in multi-casualty incident',
    tags: ['key-term', 'triage', 'ch36']
  }
];

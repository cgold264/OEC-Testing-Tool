import { OECDomain } from '../types/oec';

export const OEC_DOMAINS: OECDomain[] = [
  {
    id: 'foundations-assessment',
    name: 'Domain 1: Foundations & Assessment',
    chapters: [1, 2, 3, 4, 5, 6, 7, 8],
    description: 'BSI, Scene Safety, Primary Assessment (ABCDE), Secondary Assessment (SAMPLE, OPQRST, DCAP-BTLS), and Vital Signs.'
  },
  {
    id: 'trauma-shock',
    name: 'Domain 2: Trauma & Shock',
    chapters: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    description: 'Mechanism of Injury, Shock management, Bleeding control, Soft-tissue injuries, Burns, Chest, Abdomen, and Head/Spine trauma.'
  },
  {
    id: 'orthopedics-splinting',
    name: 'Domain 3: Orthopedics & Splinting',
    chapters: [20, 21, 22],
    description: 'Musculoskeletal injuries, Fractures, Dislocations, Sprains, Traction splints (Sager), SAM splints, and CSM checks.'
  },
  {
    id: 'medical-emergencies',
    name: 'Domain 4: Medical Emergencies',
    chapters: [23, 24, 25, 26, 27, 28, 29],
    description: 'Respiratory distress, Cardiac emergencies, Stroke, Altered Mental Status, Diabetes, Allergic reactions, and Poisoning.'
  },
  {
    id: 'environmental-wilderness',
    name: 'Domain 5: Environmental & Wilderness',
    chapters: [30, 31, 32, 33],
    description: 'Cold emergencies (Hypothermia, Frostbite), Heat illness, Altitude sickness (AMS, HAPE, HACE), and Submersion.'
  },
  {
    id: 'outdoor-special-ops',
    name: 'Domain 6: Outdoor Special Operations',
    chapters: [34, 35, 36, 37, 38],
    description: 'Toboggan handling and packaging, Chairlift evacuation, Mass-Casualty Incidents (START Triage), and Mountain search/rescue.'
  },
  {
    id: 'anatomy',
    name: 'Domain 7: Anatomy',
    chapters: [2],
    description: 'Anatomical terms, body systems, and major bones (superior/inferior, skeletal structure).'
  }
];

export const OEC_CHAPTER_MAP: Record<number, string> = {
  1: 'Introduction to Outdoor Emergency Care',
  2: 'Anatomy and Physiology',
  3: 'Medical Terminology',
  4: 'Rescue Basics and Public Health',
  5: 'Patient Assessment and Scene Size-Up',
  6: 'Medical History and Vital Signs',
  7: 'Airway Management and Oxygen Therapy',
  8: 'Documentation and Communication',
  9: 'Mechanisms of Injury and Kinematics',
  10: 'Shock Management',
  11: 'Bleeding Control',
  12: 'Soft-Tissue and Burn Injuries',
  13: 'Eye, Face, and Throat Injuries',
  14: 'Thoracic Trauma',
  15: 'Abdominal and Pelvic Trauma',
  16: 'Head and Spine Injuries',
  17: 'Spinal Motion Restriction',
  18: 'Trauma in Special Populations',
  19: 'Multi-System Trauma',
  20: 'Principles of Musculoskeletal Care',
  21: 'Upper Extremity Splinting',
  22: 'Lower Extremity Splinting & Traction',
  23: 'Respiratory Emergencies',
  24: 'Cardiovascular Emergencies',
  25: 'Neurological Emergencies and Stroke',
  26: 'Altered Mental Status and Diabetes',
  27: 'Allergic Reactions and Anaphylaxis',
  28: 'Poisoning and Overdose',
  29: 'Acute Abdominal Medical Conditions',
  30: 'Cold-Related Injuries and Hypothermia',
  31: 'Heat-Related Illnesses',
  32: 'High-Altitude Illnesses',
  33: 'Water Emergencies',
  34: 'Outdoor Patient Packaging & Toboggans',
  35: 'Ski Lift Evacuation',
  36: 'Mass-Casualty Incidents & START Triage',
  37: 'Search and Rescue Operations',
  38: 'Incident Command System (ICS)'
};

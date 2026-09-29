export interface CoherenceSetting {
  id: string;
  category: 'on-mountain' | 'off-piste' | 'terrain-park' | 'lift-environment' | 'base-lodge';
  locationName: string;
  defaultWeather: string;
  logistics: string;
  patientArchetypes: Array<{
    ageRange: [number, number];
    genders: string[];
    activities: string[];
    demeanors: string[];
  }>;
  compatibleMechanisms: string[];
  compatiblePathologies: Array<{
    title: string;
    difficulty: 'Standard' | 'Challenging' | 'Critical';
    primary: string;
    secondary?: string;
    mustDo: string[];
    criticalFails: string[];
  }>;
}

export const MOUNTAIN_COHERENCE_MATRIX: CoherenceSetting[] = [
  {
    id: 'glades-tree-collision',
    category: 'off-piste',
    locationName: 'Out-of-bounds glades skier\'s right of Lower Peak',
    defaultWeather: '19°F (-7°C), gusting winds, overcast with fading daylight',
    logistics: 'Steep tree line; requires toboggan with tail-rope belay and vacuum mattress',
    patientArchetypes: [
      {
        ageRange: [24, 45],
        genders: ['Male', 'Female'],
        activities: ['Snowboarder in deep powder', 'Advanced all-mountain skier'],
        demeanors: ['Anxious, dyspneic, clutching right side', 'Groaning, responds to verbal only']
      }
    ],
    compatibleMechanisms: [
      'High-velocity direct impact against pine tree',
      'Loss of control in variable crust snow into rock outcrop'
    ],
    compatiblePathologies: [
      {
        title: 'Blunt Thoracic Trauma with Developing Tension Pneumothorax',
        difficulty: 'Critical',
        primary: 'Tension pneumothorax right lung with multiple fractured ribs',
        secondary: 'Closed greenstick fracture left wrist',
        mustDo: [
          'Immediate scene size-up assessing overhead tree snow/widowmaker hazards',
          'Primary assessment with manual C-spine restriction',
          'Early high-flow Oxygen via Non-Rebreather (15 LPM)',
          'Recognition of diminished right breath sounds and tracheal deviation',
          'Urgent toboggan transport request and ALS intercept coordination'
        ],
        criticalFails: [
          'Failing to auscultate or assess lung sounds in a severe chest impact',
          'Fixating solely on wrist pain while ignoring respiratory decompensation',
          'Delaying mountain evacuation for non-essential field splinting'
        ]
      },
      {
        title: 'High-Impact Femur Fracture in Severe Cold Exposure',
        difficulty: 'Challenging',
        primary: 'Closed mid-shaft femur fracture right leg',
        secondary: 'Mild hypothermia (core temp ~94°F)',
        mustDo: [
          'BSI and scene safety',
          'Assess distal CSM (pulse, sensation, motor) before and after splinting',
          'Application of mechanical traction splint (e.g., Sager Splint) with ankle hitch',
          'Packaging in multi-layer hypothermia wrap (burrito) before toboggan run'
        ],
        criticalFails: [
          'Failing to check distal CSM before or after applying traction',
          'Transporting patient on cold toboggan bed without insulation',
          'Applying traction splint over an unassessed pelvic fracture'
        ]
      }
    ]
  },
  {
    id: 'terrain-park-impact',
    category: 'terrain-park',
    locationName: 'Main Terrain Park - 40ft Jump Feature',
    defaultWeather: '28°F (-2°C), sunny with hard-packed snow',
    logistics: 'Direct access for ski patrol rescue sled, clear path to clinic',
    patientArchetypes: [
      {
        ageRange: [16, 26],
        genders: ['Male', 'Female'],
        activities: ['Freestyle snowboarder', 'Park skier on twin-tips'],
        demeanors: ['Confused, repetitive questioning, combative', 'Dazed, holding shoulder in agony']
      }
    ],
    compatibleMechanisms: [
      'Over-rotated invert, landed directly onto head and neck on icy knuckle',
      'Overshot jump landing onto hard-pack flat'
    ],
    compatiblePathologies: [
      {
        title: 'Traumatic Brain Injury (Concussion) with C-Spine Precaution',
        difficulty: 'Standard',
        primary: 'Grade 3 Concussion with loss of consciousness and anterograde amnesia',
        secondary: 'Anterior shoulder dislocation right arm',
        mustDo: [
          'Immediate manual cervical spine stabilization upon contact',
          'AVPU & Glasgow Coma Scale / orientation check (Person, Place, Time, Event)',
          'Maintain spinal motion restriction with cervical collar and backboard/vacuum mattress',
          'Assess and document cranial nerves and distal CSM x 4'
        ],
        criticalFails: [
          'Allowing patient to stand up or walk off the jump feature',
          'Failing to hold manual C-spine prior to placing collar',
          'Attempting to manually reduce the dislocated shoulder on scene'
        ]
      },
      {
        title: 'Suspected Unstable Pelvic Fracture',
        difficulty: 'Critical',
        primary: 'Open-book pelvic ring disruption from vertical deceleration',
        secondary: 'Compensating hypovolemic shock (HR 124, BP 98/62)',
        mustDo: [
          'Gentle inward downward pelvic compression check (check ONCE only)',
          'Immediate circumferential pelvic binder or sheet wrap stabilization',
          'Spinal motion restriction directly onto full vacuum mattress',
          'High-flow oxygen and rapid toboggan evacuation'
        ],
        criticalFails: [
          'Repeatedly rocking or compressing an unstable pelvis',
          'Failing to recognize progressive tachycardia as early hemorrhagic shock',
          'Attempting to log-roll aggressively without pelvic support'
        ]
      }
    ]
  },
  {
    id: 'groomed-cruiser-collision',
    category: 'on-mountain',
    locationName: 'Lower Mountain Blue Cruiser - Near Trail Merge',
    defaultWeather: '26°F (-3°C), moderate snowfall, good visibility',
    logistics: 'Standard toboggan route directly to base patrol clinic',
    patientArchetypes: [
      {
        ageRange: [30, 60],
        genders: ['Female', 'Male'],
        activities: ['Recreational intermediate skier', 'Snowboarder'],
        demeanors: ['Alert, tearful, writhing in pain holding lower leg']
      }
    ],
    compatibleMechanisms: [
      'Skier-on-skier collision at trail intersection; binding failed to release',
      'Caught outside ski edge on groomer, audible snap with rotational torque'
    ],
    compatiblePathologies: [
      {
        title: 'Displaced Tibia-Fibula Fracture with Boot Compromise',
        difficulty: 'Standard',
        primary: 'Angulated closed tibia-fibula fracture right lower leg',
        secondary: 'None',
        mustDo: [
          'Assess distal pedal pulse and cap refill before touching limb',
          'Gentle inline stabilization and padded rigid/vacuum splinting from knee to foot',
          'Careful decision on ski boot removal vs splinting in boot',
          'Post-splint CSM verification and packaging into toboggan with leg elevated'
        ],
        criticalFails: [
          'Rough manipulation of angulated bone causing it to pierce skin',
          'Failing to reassess distal pulse after splint application'
        ]
      }
    ]
  },
  {
    id: 'base-day-lodge',
    category: 'base-lodge',
    locationName: 'Main Day Lodge - Second Floor Cafeteria',
    defaultWeather: 'Indoor heated environment (68°F), dry floors',
    logistics: 'Wheelchair or gurney access to loading bay; direct ambulance handoff',
    patientArchetypes: [
      {
        ageRange: [55, 78],
        genders: ['Male', 'Female'],
        activities: ['Grandparent visiting family', 'Resting skier after morning session'],
        demeanors: ['Pale, clutching center of chest, diaphoretic, short of breath']
      }
    ],
    compatibleMechanisms: [
      'Nontraumatic acute medical onset while eating lunch',
      'Sudden lightheadedness followed by near-syncope'
    ],
    compatiblePathologies: [
      {
        title: 'Suspected Acute Myocardial Infarction (AMI)',
        difficulty: 'Standard',
        primary: 'Acute Coronary Syndrome with crushing substernal chest pressure',
        secondary: 'Mild cardiogenic pulmonary edema',
        mustDo: [
          'BSI & medical scene size-up',
          'OPQRST pain evaluation and SAMPLE history',
          'Position of comfort (semi-Fowler\'s) and high-flow O2 if dyspneic or SpO2 < 94%',
          'Inquire about Aspirin eligibility (administer 324 mg chewable if indicated)',
          'Immediate 911 / Advanced Life Support (ALS) dispatch'
        ],
        criticalFails: [
          'Giving aspirin to a patient with active GI bleed or known allergy',
          'Allowing patient to walk down stairs to ambulance',
          'Administering nitroglycerin without checking blood pressure or PDE-5 inhibitors'
        ]
      },
      {
        title: 'Severe Symptomatic Hypoglycemia',
        difficulty: 'Standard',
        primary: 'Hypoglycemic crisis in Type 1 diabetic after vigorous skiing',
        secondary: 'Minor scalp abrasion from collapsing onto table',
        mustDo: [
          'Assess level of consciousness and airway protective reflexes',
          'SAMPLE history checking insulin dose and last meal intake',
          'Administer oral glucose gel in cheek/gum pouch IF airway reflexes intact',
          'Continuous monitoring of mental status until EMS arrives'
        ],
        criticalFails: [
          'Administering fluids or oral glucose to an unconscious patient unable to swallow',
          'Giving insulin instead of glucose'
        ]
      }
    ]
  },
  {
    id: 'backcountry-bowl',
    category: 'off-piste',
    locationName: 'High Alpine Bowl (Hike-to Terrain)',
    defaultWeather: '10°F (-12°C), high winds, low visibility',
    logistics: 'Complex extraction requiring rope rescue and avalanche mitigation, delayed ALS intercept',
    patientArchetypes: [
      {
        ageRange: [20, 45],
        genders: ['Male', 'Female'],
        activities: ['Backcountry skier', 'Mountaineer'],
        demeanors: ['Lethargic, shivering violently, confused', 'Gasping for air, cyanotic lips']
      }
    ],
    compatibleMechanisms: [
      'Caught in a small sluff avalanche, buried chest-deep for 20 minutes',
      'Exhaustion and rapid ascent without proper acclimatization'
    ],
    compatiblePathologies: [
      {
        title: 'Severe Hypothermia and Mild Frostbite',
        difficulty: 'Critical',
        primary: 'Moderate to Severe Hypothermia (core temp ~86°F)',
        secondary: 'Superficial frostbite on nose and fingertips',
        mustDo: [
          'Immediate scene size-up for secondary avalanche hazards',
          'Handle patient extremely gently to prevent ventricular fibrillation',
          'Remove wet clothing and package in a dry multi-layer vapor barrier (hypothermia wrap)',
          'Apply gentle active external warming to thorax/groin only',
          'Immediate rapid transport'
        ],
        criticalFails: [
          'Allowing the patient to walk or exert themselves',
          'Rubbing the frostbitten areas',
          'Rough handling causing cardiac arrest'
        ]
      },
      {
        title: 'High Altitude Pulmonary Edema (HAPE)',
        difficulty: 'Challenging',
        primary: 'Non-cardiogenic pulmonary edema from rapid ascent to 12,000 ft',
        secondary: 'Early signs of High Altitude Cerebral Edema (HACE) (ataxia)',
        mustDo: [
          'Assess lung sounds and oxygen saturation',
          'Immediate administration of high-flow oxygen',
          'Keep patient warm and seated upright (position of comfort)',
          'Rapid descent to lower elevation'
        ],
        criticalFails: [
          'Leaving the patient at altitude to "wait it out"',
          'Having the patient ski down on their own',
          'Failing to recognize respiratory distress as HAPE rather than pneumonia'
        ]
      }
    ]
  },
  {
    id: 'lodge-cafeteria-anaphylaxis',
    category: 'base-lodge',
    locationName: 'Mid-Mountain Lodge Restaurant',
    defaultWeather: 'Indoor, crowded dining area (65°F)',
    logistics: 'Direct snowmobile/toboggan access, indoor environment',
    patientArchetypes: [
      {
        ageRange: [12, 35],
        genders: ['Male', 'Female'],
        activities: ['Eating lunch mid-ski day'],
        demeanors: ['Panicked, clutching throat, wheezing loudly', 'Flushed skin, hives, dizzy']
      }
    ],
    compatibleMechanisms: [
      'Accidental ingestion of a food allergen (e.g., peanuts) in a brownie',
      'Unknown allergic reaction setting in rapidly after a meal'
    ],
    compatiblePathologies: [
      {
        title: 'Severe Anaphylactic Shock',
        difficulty: 'Challenging',
        primary: 'Systemic anaphylaxis with airway compromise (stridor) and distributive shock (BP 80/50)',
        secondary: 'Widespread urticaria (hives)',
        mustDo: [
          'Rapid recognition of systemic allergic reaction (involving 2+ body systems)',
          'Assess airway and lung sounds (wheezing/stridor)',
          'Assist with or administer Epinephrine Auto-Injector (0.3 mg IM in lateral thigh)',
          'Provide high-flow oxygen and monitor for need of second Epi dose after 5-15 mins',
          'Immediate ALS dispatch for advanced airway management'
        ],
        criticalFails: [
          'Delaying epinephrine administration while looking for antihistamines',
          'Administering an adult epi-pen to a small child without checking dose',
          'Assuming the patient just has a mild allergic reaction when hypotension is present'
        ]
      }
    ]
  },
  {
    id: 'base-area-stroke',
    category: 'base-lodge',
    locationName: 'Ticket Office / Base Area Plaza',
    defaultWeather: '32°F (0°C), sunny and calm',
    logistics: 'Ambulance can pull up directly to the plaza',
    patientArchetypes: [
      {
        ageRange: [60, 85],
        genders: ['Male', 'Female'],
        activities: ['Purchasing lift tickets', 'Waiting for family members'],
        demeanors: ['Confused, slurred speech, drooping face on one side']
      }
    ],
    compatibleMechanisms: [
      'Sudden onset of neurological deficits while standing in line'
    ],
    compatiblePathologies: [
      {
        title: 'Acute Ischemic Stroke',
        difficulty: 'Standard',
        primary: 'Acute ischemic stroke in the middle cerebral artery territory',
        secondary: 'None',
        mustDo: [
          'Perform a Cincinnati Prehospital Stroke Scale (CPSS) or FAST exam',
          'Establish the exact time of onset (Time Last Known Normal)',
          'Check blood glucose to rule out hypoglycemia mimicking a stroke',
          'Minimize on-scene time ("Load and Go") and notify receiving hospital of a "Stroke Alert"'
        ],
        criticalFails: [
          'Failing to ask about the time last known normal',
          'Administering aspirin or anything by mouth to a patient with a suspected stroke',
          'Failing to check blood glucose'
        ]
      },
      {
        title: 'Hemorrhagic Shock from Ruptured Peptic Ulcer / GI Bleed',
        difficulty: 'Critical',
        primary: 'Massive upper gastrointestinal bleed (vomiting coffee-ground emesis)',
        secondary: 'Decompensated hypovolemic shock (HR 135, BP 70/40, pale/diaphoretic)',
        mustDo: [
          'BSI with emphasis on avoiding contact with emesis',
          'Manage airway and prepare suction if available',
          'Position patient in shock position (supine) if airway is patent, or recovery position if vomiting',
          'Provide high-flow oxygen to maximize delivery to remaining red blood cells',
          'Rapid transport and ALS intercept for fluid resuscitation'
        ],
        criticalFails: [
          'Failing to recognize profound shock based on pale skin, tachycardia, and hypotension',
          'Allowing patient to sit upright when profoundly hypotensive',
          'Delaying transport for prolonged secondary assessment'
        ]
      }
    ]
  },
  {
    id: 'tree-well-suffocation',
    category: 'off-piste',
    locationName: 'Deep Powder Glades',
    defaultWeather: '15°F (-9°C), heavy snowfall, deep fresh powder',
    logistics: 'Difficult extraction, deep snow, requires multiple patrollers for digging',
    patientArchetypes: [
      {
        ageRange: [18, 40],
        genders: ['Male', 'Female'],
        activities: ['Skiing deep powder through tight trees'],
        demeanors: ['Unresponsive', 'Gasping, panicked, severely hypoxic']
      }
    ],
    compatibleMechanisms: [
      'Fell head-first into a deep tree well, buried under snow for 10 minutes'
    ],
    compatiblePathologies: [
      {
        title: 'Snow Immersion Asphyxiation and Cardiac Arrest',
        difficulty: 'Critical',
        primary: 'Hypoxia-induced cardiac arrest following snow burial',
        secondary: 'Mild hypothermia',
        mustDo: [
          'Immediate scene safety and extrication from tree well',
          'Check pulse and breathing simultaneously (max 10 seconds)',
          'Initiate high-quality CPR immediately (focus on oxygenation/ventilations as cause is hypoxic)',
          'Attach AED as soon as available',
          'Prepare for prolonged resuscitation and rapid transport'
        ],
        criticalFails: [
          'Failing to manage the airway effectively in a hypoxic arrest',
          'Delaying CPR to fully package the patient in the toboggan',
          'Failing to request ALS immediately'
        ]
      }
    ]
  }

];

export function getRandomScenarioSkeleton(): {
  setting: CoherenceSetting;
  pathology: CoherenceSetting['compatiblePathologies'][0];
  patient: { age: number; gender: string; activity: string; demeanor: string };
  mechanism: string;
} {
  const setting = MOUNTAIN_COHERENCE_MATRIX[Math.floor(Math.random() * MOUNTAIN_COHERENCE_MATRIX.length)];
  const pathology = setting.compatiblePathologies[Math.floor(Math.random() * setting.compatiblePathologies.length)];
  const arch = setting.patientArchetypes[Math.floor(Math.random() * setting.patientArchetypes.length)];
  const age = Math.floor(Math.random() * (arch.ageRange[1] - arch.ageRange[0] + 1)) + arch.ageRange[0];
  const gender = arch.genders[Math.floor(Math.random() * arch.genders.length)];
  const activity = arch.activities[Math.floor(Math.random() * arch.activities.length)];
  const demeanor = arch.demeanors[Math.floor(Math.random() * arch.demeanors.length)];
  const mechanism = setting.compatibleMechanisms[Math.floor(Math.random() * setting.compatibleMechanisms.length)];

  return {
    setting,
    pathology,
    patient: { age, gender, activity, demeanor },
    mechanism
  };
}

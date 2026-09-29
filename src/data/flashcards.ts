import { DOMAIN_1_FLASHCARDS } from './flashcards/domain1';
import { DOMAIN_2_FLASHCARDS } from './flashcards/domain2';
import { DOMAIN_3_FLASHCARDS } from './flashcards/domain3';
import { DOMAIN_4_FLASHCARDS } from './flashcards/domain4';
import { DOMAIN_5_FLASHCARDS } from './flashcards/domain5';
import { DOMAIN_6_FLASHCARDS } from './flashcards/domain6';
import { ANATOMY_FLASHCARDS } from './flashcards/anatomy';

import { Flashcard } from '../types/oec';

export const ALL_FLASHCARDS: Flashcard[] = [
  ...DOMAIN_1_FLASHCARDS,
  ...DOMAIN_2_FLASHCARDS,
  ...DOMAIN_3_FLASHCARDS,
  ...DOMAIN_4_FLASHCARDS,
  ...DOMAIN_5_FLASHCARDS,
  ...DOMAIN_6_FLASHCARDS,
  ...ANATOMY_FLASHCARDS
];

export const SAMPLE_FLASHCARDS = ALL_FLASHCARDS;
// Exporting this for legacy if it's imported elsewhere, even though it's the same now
export const CHAPTER_KEY_TERMS = ALL_FLASHCARDS;
export const CORE_FLASHCARDS = ALL_FLASHCARDS;

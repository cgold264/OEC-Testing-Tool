## 1. Project Initialization & Infrastructure

- [x] 1.1 Initialize Vite + React + TypeScript project with Tailwind CSS
- [x] 1.2 Configure mobile-first responsive layout shell with navigation bar and view router
- [x] 1.3 Configure Cloudflare Pages setup with local functions support and wrangler config
- [x] 1.4 Setup client-side state and localStorage persistence utilities for study progress

## 2. Content Pipeline & Data Schemas

- [x] 2.1 Define TypeScript schemas and types for flashcards, exam questions, and scenario rubrics
- [x] 2.2 Create question extraction / scraping script with configurable selectors and session handling
- [x] 2.3 Implement question normalization, deduplication, and schema validation
- [x] 2.4 Seed baseline OEC chapter definitions, starter flashcard decks, and initial question banks

## 3. Flashcard Review Module

- [x] 3.1 Build flashcard component with 3D flip animation and responsive touch/click controls
- [x] 3.2 Implement chapter and domain filter dropdowns
- [x] 3.3 Add "Need Review" and "Mastered" actions hooked to localStorage mastery tracking
- [x] 3.4 Build deck progress indicator and study session completion screen

## 4. 100-Question Exam Simulator

- [x] 4.1 Implement exam engine with balanced sampling logic across OEC chapters
- [x] 4.2 Build single-question test interface with mobile-friendly answer selections
- [x] 4.3 Implement question flagging, quick-jump question grid, and 120-minute countdown timer
- [x] 4.4 Build exam scoring engine with 80% passing threshold and domain-by-domain analysis
- [x] 4.5 Implement post-test review interface with question filtering and rationales

## 5. Mountain Scene Simulator Backend & Logic

- [x] 5.1 Implement deterministic mountain coherence matrix (locations, compatible MOI/NOI, pathologies)
- [x] 5.2 Create Cloudflare Pages Function `/functions/api/scenario-chat.ts` integrating Google Gemini 2.0 Flash
- [x] 5.3 Implement reactive facilitator system prompt with information concealment and OEC evaluator rubric
- [x] 5.4 Implement scenario generation endpoint returning structured scenario cards with medical ground truth

## 6. Mountain Scene Simulator Frontend UX

- [x] 6.1 Build chat interface with message stream, input bar, and auto-scroll
- [x] 6.2 Implement collapsible "Patrol Clipboard / Vital Sheet" displaying live discovered clinical signs
- [x] 6.3 Add mobile-friendly Quick Action Chips (BSI/Scene Safe, AVPU, Check Vitals, Palpate C-spine)
- [x] 6.4 Implement transport conclusion trigger and Evaluator Debrief scorecard

## 7. Verification & Deployment Readiness

- [x] 7.1 Verify build with `npm run build` and test responsive views on mobile and desktop viewports
- [x] 7.2 Document Cloudflare Pages deployment process and `GEMINI_API_KEY` environment variable setup

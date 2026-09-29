## Why

Preparing for the Outdoor Emergency Care (OEC) certification exam and practical evaluations requires mastering extensive wilderness and winter emergency medical protocols, retaining chapter-by-chapter knowledge, and practicing hands-on scenario assessments. Currently, candidates lack a unified, mobile-friendly study tool that combines rapid flashcard review, full-length exam simulations, and realistic dynamic scene practice. This change introduces a 100% free, serverless web platform hosted on Cloudflare Pages tailored for OEC candidates and study groups.

## What Changes

- Create a modern, mobile-responsive React web application (Vite + Tailwind CSS) deployed on Cloudflare Pages.
- Implement a Flashcard Review module filterable by OEC chapters with self-assessment tracking persisted in browser `localStorage`.
- Implement a 100-Question Exam Simulator that samples from a structured question bank, provides timed/untimed testing, and generates category-based score reports with answer rationales.
- Implement an interactive, realistic Scene Simulator backed by a Cloudflare Pages serverless function (`/functions/api/scenario-chat.ts`) and the Google Gemini 2.0 Flash API.
- Implement a two-stage dynamic scenario generation engine featuring a mountain coherence matrix (guardrails preventing illogical cases like tree strikes in the lodge) and a reactive LLM facilitator that only reveals physical findings and vitals when the user explicitly conducts the exam.
- Implement a data scraping and normalization script to extract and format OEC question banks into static JSON datasets.

## Capabilities

### New Capabilities
- `flashcard-review`: Flashcard study interface with chapter filters, flip animations, and client-side progress tracking.
- `exam-simulator`: Full-length 100-question practice test engine with timer, question flagging, score analysis, and rationales.
- `scene-simulator`: Dynamic OEC scenario generator with mountain logic guardrails, reactive LLM facilitator, live vitals clipboard, and post-scenario evaluation rubrics via Gemini Flash.
- `content-pipeline`: Automated extraction and ingestion scripts to scrape, normalize, and validate OEC question banks into structured JSON assets.

### Modified Capabilities
*(None - greenfield project)*

## Impact

- **Hosting & Infrastructure**: Deployed on Cloudflare Pages with zero hosting costs, utilizing Cloudflare Pages Functions for serverless LLM proxying.
- **APIs & Secrets**: Integrates with Google Gemini 2.0 Flash API; API keys stored securely as Cloudflare environment variables (`GEMINI_API_KEY`).
- **Dependencies**: React, Vite, Tailwind CSS, Lucide React (icons), Playwright/Puppeteer/Cheerio (for scraping script).
- **Data Storage**: Client-side `localStorage` for study progress, scores, and review queues; static JSON files for curriculum and question pools.

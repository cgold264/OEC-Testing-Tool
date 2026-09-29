## Context

The Outdoor Emergency Care (OEC) curriculum developed by the National Ski Patrol requires mastery across six major medical/trauma domains, along with practical scenario assessments. Candidates need a cohesive, mobile-first study tool to test didactic knowledge and simulate live mountain scenarios. The target audience is small (≤ 5 users, such as a ski patrol candidate cohort), requiring a zero-cost, maintenance-free hosting architecture with responsive UX across phones and desktop browsers.

## Goals / Non-Goals

**Goals:**
- Provide a 100% free hosting and compute stack utilizing Cloudflare Pages and Cloudflare Pages Functions.
- Deliver three integrated learning modes: Flashcard Review, 100-Question Exam Simulation, and an Interactive Mountain Scene Simulator.
- Securely proxy LLM API calls via a serverless function using the Google Gemini 2.0 Flash API without exposing API keys to the browser.
- Ensure 100% realistic scenario generation using a deterministic mountain coherence matrix (preventing illogical mechanism-of-injury combinations) coupled with a reactive LLM facilitator that conceals findings until the patroller specifically conducts the physical assessment.
- Persist user study state, card mastery, and exam history client-side in `localStorage` without requiring a remote database.
- Supply an automated scraping and ingestion script to populate question pools from OEC study materials into versioned JSON files.

**Non-Goals:**
- Multi-user authentication or cloud account syncing (all state stays local to the user's browser).
- Paid infrastructure, dedicated database servers, or custom domain registration requirements.
- Full electronic medical record (EMR) charting or certification grading beyond OEC practice rubrics.

## Decisions

### 1. Cloudflare Pages + Pages Functions
- **Choice**: Deploy as a static React application on Cloudflare Pages with edge serverless functions located in `/functions/api/`.
- **Rationale**: Cloudflare Pages offers unlimited free bandwidth, instant global CDN delivery, and edge functions with zero cold starts. The serverless function `/functions/api/scenario-chat.ts` securely accesses `GEMINI_API_KEY` stored in Cloudflare environment variables, keeping credentials off the client.
- **Alternatives Considered**: 
  - *Pure GitHub Pages*: Requires users to manually provide their own API key in a settings box or risks leaking keys in client bundles.
  - *Vercel*: Generous free tier, but Cloudflare provides better unified edge worker performance and zero cold starts for static + serverless combos.

### 2. LLM Engine: Google Gemini 2.0 Flash
- **Choice**: Google Gemini 2.0 Flash via Google AI Studio API.
- **Rationale**: 
  - Free tier offers 1,000,000 Tokens Per Minute (TPM) and 1,500 Requests Per Day (RPD), avoiding rate limits during long 20+ turn scenario simulations with lengthy rubrics.
  - Native structured output enforcement (`response_schema`) guarantees valid JSON for dynamic scenario generation.
  - Rapid streaming output (~120–160 tokens/sec) provides fluid, realistic conversational pacing.
- **Alternatives Considered**: 
  - *Groq (Llama 3.3 70B)*: Faster raw token generation, but strict TPM limits (6,000–30,000 TPM) on the free tier risk throwing 429 rate limit errors mid-scenario.

### 3. Two-Stage Coherent Scenario Generation & Reactive Evaluator
- **Choice**:
  1. *Stage 1 (Deterministic Matrix)*: Selects logically compatible slots (Location $\rightarrow$ MOI/NOI $\rightarrow$ Pathology $\rightarrow$ Transport logistics) to prevent mismatched scenarios (e.g. high-speed tree strike occurring inside the lodge).
  2. *Stage 2 (Gemini Generation)*: Fleshes out detailed dispatch calls, vitals tables, DCAP-BTLS findings, patient dialogue, and scoring rubrics into a structured JSON card.
  3. *Reactive Facilitator Prompt*: The LLM acts as proctor and patient, strictly withholding vitals and exam clues until the patroller explicitly asks or performs the maneuver.
- **Rationale**: Pure procedural templates feel rigid, while unconstrained LLM generation creates medically or environmentally absurd cases. A hybrid system ensures 100% mountain realism with infinite narrative variety.

### 4. Client-Side Data Architecture
- **Choice**: Static JSON bundles for curriculum/questions; `localStorage` with TypeScript wrapper for user state.
- **Rationale**: For ≤ 5 users, a centralized database introduces operational overhead and potential hosting costs. `localStorage` provides instant persistence, offline capability on mobile devices, and zero backend maintenance.

### 5. Scraping & Ingestion Pipeline
- **Choice**: Standalone Node.js script using Playwright/Cheerio to extract questions from OEC practice portals and normalize them into validated JSON schemas.
- **Rationale**: Allows rapid refreshing or expanding of the question bank without modifying application code.

## Risks / Trade-offs

- **[Risk] Gemini API 15 RPM Free Tier Ceiling** $\rightarrow$ *Mitigation*: 15 requests per minute is more than sufficient for a 5-person cohort conducting turn-based physical exams. Client displays a gentle retry countdown if rate limit headers indicate throttling.
- **[Risk] Browser Cache Clearance / LocalStorage Loss** $\rightarrow$ *Mitigation*: Provide simple JSON "Export My Progress / Import Progress" buttons in settings so users can back up their test history.
- **[Risk] Scraper Brittleness** $\rightarrow$ *Mitigation*: Decouple scraper from runtime; scraper runs as a build-time/offline batch process outputting committed JSON files in `/src/data/questions/`.
- **[Risk] Mobile Viewport Constraints during Scenario Chat** $\rightarrow$ *Mitigation*: Implement a collapsible "Vital Sheet & Patrol Notebook" drawer that auto-records vitals as revealed in chat, keeping the conversation stream clean.

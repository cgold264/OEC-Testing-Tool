# OEC Study & Practical Testing Platform ⛷️

A dedicated, mobile-friendly study tool and interactive AI simulator for candidates preparing for the **Outdoor Emergency Care (OEC)** certification exam and practical evaluations (National Ski Patrol / Mountain Rescue).

## ✨ Features

1. **Flashcard Review**:
   - Filterable by OEC Chapters and the 6 Core Medical/Trauma Domains.
   - Interactive 3D flip card with keyboard shortcuts (`Space` to flip, `←` / `→` to navigate, `1` / `2` for assessment).
   - Client-side mastery tracking (`Mastered` vs `Needs Review`) stored in browser `localStorage`.
2. **100-Question Exam Simulator**:
   - Full 100-question practice test with 4-choice options and realistic OEC test questions.
   - 120-minute countdown timer or untimed practice drill.
   - Question flagging, progress tracking, and interactive quick-jump question grid.
   - Detailed Score Report with an 80% passing threshold, domain-by-domain analytics, and textbook rationales for every question.
3. **Mountain Scene Simulator**:
   - Realistic emergency scenario generator backed by a deterministic **Mountain Coherence Matrix** (ensuring compatible environments, mechanisms, and pathologies).
   - Reactive Facilitator powered by **Groq API (LLaMA-3.3-70B)**: conceals clinical findings, vitals, and diagnoses until the patroller specifically conducts the physical assessment.
   - Live collapsible **Patrol Clipboard** tracking discovered vitals and clinical signs.
   - Mobile-friendly **Quick Action Chips** for rapid on-mountain testing.
   - Conclude & Debrief mode delivering official OEC rubric feedback and critical fail checks.
4. **Data Ingestion & Scraper**:
   - Built-in utility script to scrape, parse, and normalize questions from web portals and quiz exports into structured JSON.

---

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Environment Variables & API Key
Copy the example environment template:
```bash
cp .dev.vars.example .dev.vars
# or
cp .env.example .env
```

Add your free **Groq API Key** inside `.dev.vars` or `.env`:
```ini
GROQ_API_KEY=gsk_your_groq_api_key_here
```
> **Tip:** You can get a 100% free Groq API key in 30 seconds (no credit card or billing required) at [Groq Console](https://console.groq.com/keys). You can also input your key directly into the in-app **Settings** modal at any time.

### 3. Local Development

**Standard Frontend Development:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. (Scene simulator includes an offline simulator fallback if the backend function is not running).

**Full-Stack Cloudflare Pages & Functions Simulation:**
```bash
npm run build
npx wrangler pages dev dist --compatibility-date=2024-04-01
```
This runs the local edge functions located in `/functions/api/` with `.dev.vars` injected automatically.

---

## 🌐 Free Hosting on Cloudflare Pages

This project is optimized for 100% free hosting on Cloudflare Pages:

1. Push this repository to your GitHub account.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/):
   - Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your repository.
3. Configure build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Set Environment Variables:
   - Go to **Settings** > **Environment variables**.
   - Add variable name: `GROQ_API_KEY` with your free Groq API key (from console.groq.com/keys).
5. Click **Save and Deploy**. Your site is now live globally with zero cold starts and 100% free edge compute!

---

## 🛠️ Ingestion & Question Scraper Script

To extract questions from an online OEC question bank or saved quiz HTML file:

```bash
# Extract from a local HTML file
node scripts/scrape-questions.mjs --file ./path/to/quiz.html --output src/data/scraped-questions.json

# Fetch from a URL with session authentication
node scripts/scrape-questions.mjs --url "https://oec-portal.example/quiz" --cookie "session=xyz"
```

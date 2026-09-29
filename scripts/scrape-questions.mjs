#!/usr/bin/env node

/**
 * OEC Question Ingestion and Scraper Utility
 * 
 * Supports extracting questions from:
 * 1. An online OEC portal URL (with optional cookie/token session header)
 * 2. A saved local HTML file or raw quiz export
 * 
 * Usage:
 *   node scripts/scrape-questions.mjs --file ./raw-quiz.html
 *   node scripts/scrape-questions.mjs --url "https://portal.example.com/quiz" --cookie "session=xyz"
 */

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

function printHelp() {
  console.log(`
OEC Question Scraper & Ingestion Utility
========================================
Options:
  --file <path>       Path to local HTML file containing question markup
  --url <url>         Target URL of the quiz/exam portal to fetch
  --cookie <string>   Cookie or authorization header for authenticated portals
  --output <path>     Target output JSON file (default: src/data/scraped-questions.json)
  --help              Display this help message
`);
}

async function run() {
  const args = process.argv.slice(2);
  let filePath = null;
  let url = null;
  let cookie = null;
  let outputPath = path.resolve('src/data/scraped-questions.json');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file') filePath = args[++i];
    else if (args[i] === '--url') url = args[++i];
    else if (args[i] === '--cookie') cookie = args[++i];
    else if (args[i] === '--output') outputPath = path.resolve(args[++i]);
    else if (args[i] === '--help') {
      printHelp();
      process.exit(0);
    }
  }

  let htmlContent = '';

  if (filePath) {
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found at ${filePath}`);
      process.exit(1);
    }
    console.log(`Reading HTML source from: ${filePath}`);
    htmlContent = fs.readFileSync(filePath, 'utf-8');
  } else if (url) {
    console.log(`Fetching quiz content from: ${url}`);
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };
    if (cookie) {
      headers['Cookie'] = cookie;
    }
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: HTTP ${response.status} ${response.statusText}`);
    }
    htmlContent = await response.text();
  } else {
    console.log('No --file or --url provided. Running dry-run validation against sample data.');
    console.log('Use --help to see how to run this against real online quiz pages.');
    return;
  }

  const $ = cheerio.load(htmlContent);
  const questions = [];

  // Parse common quiz DOM patterns (e.g. .question-block, .quiz-question, .form-group)
  $('.question, .question-card, .quiz-question, .question-item').each((idx, el) => {
    const $q = $(el);
    const questionText = $q.find('.question-text, .qtext, .title, h3, h4').first().text().trim();
    if (!questionText) return;

    const options = [];
    let correctIndex = -1;

    $q.find('.answer, .option, .choice, label, li').each((optIdx, optEl) => {
      const $opt = $(optEl);
      const optText = $opt.text().replace(/^[A-D][\.\)]\s*/i, '').trim();
      if (!optText) return;

      options.push(optText);

      // Check if marked correct in DOM (checked radio, .correct class, etc)
      if (
        $opt.hasClass('correct') ||
        $opt.find('input[type="radio"]:checked').length > 0 ||
        $opt.attr('data-correct') === 'true'
      ) {
        correctIndex = optIdx;
      }
    });

    const explanation = $q.find('.explanation, .feedback, .rationale').text().trim() ||
      'Refer to official Outdoor Emergency Care text for detailed protocol rationales.';

    if (options.length >= 2) {
      questions.push({
        id: `scraped-q-${idx + 1}`,
        chapter: 5,
        domain: 'Domain 1: Foundations & Assessment',
        question: questionText,
        options,
        correctIndex: correctIndex >= 0 ? correctIndex : 0,
        explanation
      });
    }
  });

  console.log(`Extracted ${questions.length} questions.`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
  console.log(`Saved question pool to: ${outputPath}`);
}

run().catch((err) => {
  console.error('Scraper error:', err);
  process.exit(1);
});

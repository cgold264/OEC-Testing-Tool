#!/usr/bin/env python3
"""
OEC Question Scraper & Parser Utility (Python)
==============================================
Extracts multiple-choice questions from a saved HTML file or URL
and formats them into the JSON schema used by the OEC Testing Tool.

Usage:
  python3 scripts/scrape_questions.py --file raw-quiz.html
  python3 scripts/scrape_questions.py --file raw-quiz.html --output src/data/scraped-questions.json
"""

import sys
import json
import argparse
import re
from html.parser import HTMLParser

class QuizHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.raw_text = []
        self.current_tag = None

    def handle_data(self, data):
        text = data.strip()
        if text:
          self.raw_text.append(text)

def parse_html_content(html_str):
    """
    Generic parser that extracts questions, options (A-D), and rationales.
    Can be tailored to match the specific OEC site markup once sample HTML is provided.
    """
    parser = QuizHTMLParser()
    parser.feed(html_str)
    
    # Simple regex-based block extractor for common test layouts
    questions = []
    
    # Pattern to find numbered questions: e.g. "1. Which of the following..."
    # or HTML containers with question classes
    blocks = re.split(r'(?:\n|\r|\A)(?=\d+[\.\)]\s+)', html_str)
    
    q_index = 1
    for block in blocks:
        # Strip tags for clean text matching
        clean_text = re.sub(r'<[^>]+>', ' ', block)
        clean_text = re.sub(r'\s+', ' ', clean_text).strip()
        
        # Check if block looks like a question
        match = re.search(r'^(\d+)[\.\)]\s*(.+?)(?=(?:[A-D][\.\)]|\Z))', clean_text, re.IGNORECASE)
        if match:
            q_num = match.group(1)
            q_text = match.group(2).strip()
            
            # Find options A, B, C, D
            options = []
            opt_matches = list(re.finditer(r'([A-D])[\.\)]\s*(.+?)(?=(?:[A-D][\.\)]|Rationale|Explanation|\Z))', clean_text, re.IGNORECASE))
            for om in opt_matches:
                options.append(om.group(2).strip())
                
            # Find rationale if present
            explanation = "Refer to the Outdoor Emergency Care manual for protocol rationale."
            rat_match = re.search(r'(?:Rationale|Explanation):\s*(.+)', clean_text, re.IGNORECASE)
            if rat_match:
                explanation = rat_match.group(1).strip()
                
            if len(options) >= 2:
                questions.append({
                    "id": f"scraped-q-{q_index}",
                    "chapter": 5,
                    "domain": "Domain 1: Foundations & Assessment",
                    "question": q_text,
                    "options": options,
                    "correctIndex": 0,  # Default or parsed from checkmarks
                    "explanation": explanation
                })
                q_index += 1

    return questions

def main():
    parser = argparse.ArgumentParser(description="OEC Question Scraper & Ingestion Utility")
    parser.add_argument("--file", help="Path to local HTML file containing question markup")
    parser.add_argument("--output", default="src/data/scraped-questions.json", help="Target output JSON path")
    args = parser.parse_args()

    if not args.file:
        print("Please provide a file with --file <path/to/quiz.html>")
        print("Example: python3 scripts/scrape_questions.py --file raw-quiz.html")
        sys.exit(1)

    try:
        with open(args.file, "r", encoding="utf-8") as f:
            html_content = f.read()
    except Exception as e:
        print(f"Error reading {args.file}: {e}")
        sys.exit(1)

    print(f"Parsing HTML from {args.file}...")
    questions = parse_html_content(html_content)
    print(f"Successfully extracted {len(questions)} questions.")

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2)
    print(f"Saved questions to {args.output}")

if __name__ == "__main__":
    main()

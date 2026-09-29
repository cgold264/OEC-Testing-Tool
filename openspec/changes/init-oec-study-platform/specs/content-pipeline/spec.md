## ADDED Requirements

### Requirement: Automated Question Extraction
The content pipeline SHALL provide a script capable of extracting multiple-choice questions, answer choices, correct keys, and explanations from designated web resources.

#### Scenario: Running the extraction script
- **WHEN** developer runs the extraction CLI script with target credentials/source URL
- **THEN** script navigates through question pools, parses HTML/DOM elements, and extracts question objects

### Requirement: Question Normalization and Schema Validation
The content pipeline SHALL validate each extracted question against a strict TypeScript/JSON schema before writing to disk.

#### Scenario: Normalizing raw question data
- **WHEN** raw questions are parsed from the web source
- **THEN** pipeline assigns unique IDs, maps questions to standardized OEC chapter numbers and domain titles, validates that exactly one correct option is designated, and eliminates duplicate items

### Requirement: Exporting Bundled Study Assets
The content pipeline SHALL output validated JSON files directly into the frontend's static asset directory for compile-time bundling.

#### Scenario: Writing question pool to disk
- **WHEN** normalization and validation succeed
- **THEN** pipeline writes `src/data/questions/oec-question-bank.json` and updates summary statistics showing total count per chapter

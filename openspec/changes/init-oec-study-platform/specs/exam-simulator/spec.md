## ADDED Requirements

### Requirement: Exam Initialization and Sampling
The exam simulator SHALL generate a 100-question practice test randomly sampled from the question bank, preserving topic distribution ratios corresponding to standard OEC exam criteria.

#### Scenario: Starting a new 100-question practice exam
- **WHEN** user clicks "Start 100-Question Exam"
- **THEN** system draws 100 unique questions from the question bank, initializes score counters, and presents question 1 of 100

### Requirement: Examination Interface and Navigation
The exam interface SHALL support single-question viewing, mobile-friendly answer selection, question flagging for later review, and a quick-jump grid.

#### Scenario: Navigating between questions
- **WHEN** user selects an answer option and clicks "Next"
- **THEN** system saves the selected response in local session state and advances to the next question

#### Scenario: Flagging a question for review
- **WHEN** user toggles the flag icon on question 42
- **THEN** question 42 is marked as flagged in the navigation drawer and quick-jump grid for review prior to submission

### Requirement: Timed and Untimed Modes
The exam simulator SHALL provide an optional countdown timer (default 120 minutes) with warnings and untimed practice mode.

#### Scenario: Submitting exam when timer expires
- **WHEN** countdown timer reaches 00:00:00 in timed mode
- **THEN** system automatically finalizes the exam, calculates results, and navigates to the Score Report page

### Requirement: Score Analysis and Answer Review
Upon completion, the exam simulator SHALL display an overall percentage score, pass/fail status (standard 80% passing threshold), domain-level score breakdown, and rationales for every question.

#### Scenario: Viewing completed exam score breakdown
- **WHEN** user submits the exam
- **THEN** system displays overall percentage, a breakdown of correct/incorrect answers by OEC domain, and allows filtering to review only incorrect answers with textbook rationales

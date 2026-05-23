# Manual Test Checklist

Use this checklist to manually verify the current Edu Hub MVP learning loop.

## Before You Start

- [ ] Start the app locally.
  - Expected result: The app is running in the browser without startup errors.

- [ ] Confirm Supabase environment variables are available.
  - Expected result: The app can read and write data through Supabase.

## MVP Learning Loop

- [ ] Open the home page.
  - Expected result: The home page loads and shows navigation links.

- [ ] Click `Try procedural demo` or open `/demo`.
  - Expected result: The procedural demo page loads.

- [ ] Review the generated procedural question.
  - Expected result: The page shows a question title, body, generation seed, and hash.

- [ ] Confirm the answer is hidden before submission.
  - Expected result: The correct answer is not shown before the student submits an answer.

- [ ] Enter a numeric answer and submit it.
  - Expected result: The form accepts the answer and runs the grading flow.

- [ ] Review the grading result.
  - Expected result: The page shows the expected answer, result, and feedback.

- [ ] Confirm the attempt is saved to Supabase.
  - Expected result: The save status shows that the attempt was saved.

- [ ] Click `View student attempts` from the home page or open `/attempts`.
  - Expected result: The attempts dashboard loads.

- [ ] Confirm the latest attempt appears in the attempts dashboard.
  - Expected result: The newest row matches the question type, submitted answer, expected answer, result, seed, and hash from the demo attempt.

- [ ] Return to `/demo` and click `New question`.
  - Expected result: The demo reloads with a new procedural question.

- [ ] Submit another numeric answer for the new question.
  - Expected result: The new answer is graded and the new attempt is saved.

- [ ] Reopen `/attempts`.
  - Expected result: The newest attempt appears at the top of the table.

## Pass Criteria

- [ ] A student can move from the home page to the demo.
- [ ] A procedural accounting question is generated.
- [ ] The correct answer stays hidden until submission.
- [ ] Numeric answers are graded.
- [ ] Attempt details are stored locally in the demo.
- [ ] Attempts are saved to Supabase.
- [ ] The latest attempts are visible on `/attempts`.
- [ ] The `New question` link generates another practice question.

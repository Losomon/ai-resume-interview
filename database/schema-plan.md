# Database Schema Plan

## users

- id
- email
- password_hash
- created_at
- updated_at

## profiles

- id
- user_id
- full_name
- headline
- location
- phone
- linkedin_url
- github_url
- portfolio_url

## resumes

- id
- user_id
- title
- summary
- template
- ats_score
- created_at
- updated_at

## resume_versions

- id
- resume_id
- content_json
- created_at

## jobs

- id
- user_id
- title
- company
- location
- description
- created_at

## interviews

- id
- user_id
- job_id
- type
- difficulty
- score
- status
- created_at

## interview_questions

- id
- interview_id
- question
- category
- order_index

## interview_answers

- id
- question_id
- answer
- score
- created_at

## interview_feedback

- id
- answer_id
- communication
- relevance
- technical_accuracy
- problem_solving
- clarity
- feedback

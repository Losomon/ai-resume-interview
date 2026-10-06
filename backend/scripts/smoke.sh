# Walks every route group as a user would, then checks that a second user cannot see the first user's data.
# Needs: the API running with a migrated database, bash, curl, node. Usage: API=localhost:3000 npm run smoke
# Read the output: each line is "step  status", with the expected status in parentheses where it matters.
B=${API:-localhost:3000}/api/v1; J="Content-Type: application/json"; C="-s -b /tmp/jar -c /tmp/jar"
show(){ printf "%-34s %s\n" "$1" "$2"; }
code(){ curl -s -o /tmp/out -w "%{http_code}" "$@"; }
rm -f /tmp/jar
show "unauthenticated /resumes" "$(code $B/resumes)"
show "register (short pw)" "$(code -X POST $B/auth/register -H "$J" -d '{"name":"T","email":"t@x.io","password":"short"}')"
show "register" "$(code -c /tmp/jar -X POST $B/auth/register -H "$J" -d '{"name":"Tester","email":"T@x.io","password":"correct-horse-1"}')"
show "register duplicate" "$(code -X POST $B/auth/register -H "$J" -d '{"name":"Tester","email":"t@x.io","password":"correct-horse-1"}')"
show "me" "$(code -b /tmp/jar $B/auth/me) $(cat /tmp/out)"
show "wrong password" "$(code -X POST $B/auth/login -H "$J" -d '{"email":"t@x.io","password":"nope-nope-1"}')"
CONTENT='{"fullName":"Tester","title":"Backend Developer","summary":"API builder.","skills":["Java","SQL","Git","REST","React"],"experience":[{"id":"1","role":"Dev","company":"X","bullets":["Built REST services in Java backed by PostgreSQL for billing","Wrote unit tests that cut regressions in the billing module"]}]}'
show "create resume" "$(code $C -X POST $B/resumes -H "$J" -d "{\"title\":\"Main\",\"content\":$CONTENT}")"; RID=$(node -pe "JSON.parse(require('fs').readFileSync('/tmp/out')).id")
show "list resumes" "$(code -b /tmp/jar $B/resumes) $(node -pe "JSON.parse(require('fs').readFileSync('/tmp/out')).length") item(s)"
show "patch resume" "$(code -b /tmp/jar -X PATCH $B/resumes/$RID -H "$J" -d '{"title":"Main v2"}')"
show "duplicate" "$(code -b /tmp/jar -X POST $B/resumes/$RID/duplicate)"
JD='We need a Backend Developer with Java, Spring Boot, Docker, AWS and PostgreSQL experience, plus strong REST API skills.'
show "ats analyze" "$(code -b /tmp/jar -X POST $B/ats/analyze -H "$J" -d "{\"resumeId\":\"$RID\",\"jobDescription\":\"$JD\"}")"; node -e "const a=JSON.parse(require('fs').readFileSync('/tmp/out'));console.log('   score',a.score,'| matched',a.matched.join(','),'| evidence',a.missingEvidence.map(x=>x.skill).join(','),'| gaps',a.skillGaps.map(x=>x.skill).join(','))"
show "ats no keywords" "$(code -b /tmp/jar -X POST $B/ats/analyze -H "$J" -d "{\"resumeId\":\"$RID\",\"jobDescription\":\"Great culture, free snacks, friendly team and a beautiful office downtown.\"}")"
show "resume score written back" "$(code -b /tmp/jar $B/resumes/$RID) atsScore=$(node -pe "JSON.parse(require('fs').readFileSync('/tmp/out')).atsScore")"
show "ai suggestions" "$(code -b /tmp/jar -X POST $B/ai/suggestions -H "$J" -d '{"text":"Developed a website."}') $(node -pe "JSON.parse(require('fs').readFileSync('/tmp/out')).options.length") options"
echo "   rewrite stream:"; curl -s -N -b /tmp/jar -X POST $B/ai/rewrite -H "$J" -d '{"text":"Developed a website.","tone":"concise"}' | head -c 220; echo
show "jobs (matched to resume)" "$(code -b /tmp/jar "$B/jobs?remote=true&limit=3") "; node -e "const j=JSON.parse(require('fs').readFileSync('/tmp/out')).jobs;j.forEach(x=>console.log('   ',x.title,'-',x.company,'match',x.match&&x.match.score+'%','missing:',x.match&&x.match.missing.join(',')))"
JOB=$(node -pe "JSON.parse(require('fs').readFileSync('/tmp/out')).jobs[0].id")
show "job detail" "$(code -b /tmp/jar $B/jobs/$JOB)"
show "application create (from job)" "$(code -b /tmp/jar -X POST $B/applications -H "$J" -d "{\"company\":\"Northwind Labs\",\"title\":\"Backend Developer\",\"jobId\":\"$JOB\",\"resumeId\":\"$RID\"}")"; AID=$(node -pe "JSON.parse(require('fs').readFileSync('/tmp/out')).id")
show "application -> applied" "$(code -b /tmp/jar -X PATCH $B/applications/$AID -H "$J" -d '{"stage":"applied"}') appliedAt set: $(node -pe "!!JSON.parse(require('fs').readFileSync('/tmp/out')).appliedAt")"
show "application bad stage" "$(code -b /tmp/jar -X PATCH $B/applications/$AID -H "$J" -d '{"stage":"maybe"}')"
show "interview create" "$(code -b /tmp/jar -X POST $B/interview/sessions -H "$J" -d "{\"role\":\"Backend Developer\",\"level\":\"mid\",\"type\":\"mixed\",\"count\":4,\"resumeId\":\"$RID\"}")"; SID=$(node -pe "JSON.parse(require('fs').readFileSync('/tmp/out')).id")
node -e "
const s=JSON.parse(require('fs').readFileSync('/tmp/out'));const q=s.questions;
const good='I led the migration of our billing API to a new database. I built a plan, wrote scripts and tested it, which reduced query time by 40% and saved the team 5 hours a week.';
require('fs').writeFileSync('/tmp/ans.json',JSON.stringify({answers:[{questionId:q[0].id,answer:good,secondsTaken:90},{questionId:q[1].id,answer:'Maybe I think it was fine, I guess.'}]}));console.log('   questions:',q.length)"
show "interview autosave" "$(code -b /tmp/jar -X PATCH $B/interview/sessions/$SID -H "$J" -d @/tmp/ans.json)"
show "interview submit" "$(code -b /tmp/jar -X POST $B/interview/sessions/$SID/submit -H "$J" -d '{}')"; node -e "const s=JSON.parse(require('fs').readFileSync('/tmp/out'));console.log('   ',s.status,JSON.stringify(s.scores));console.log('    +',s.feedback.strengths.join(' | '));console.log('    -',s.feedback.improvements.join(' | '))"
show "interview submit again" "$(code -b /tmp/jar -X POST $B/interview/sessions/$SID/submit -H "$J" -d '{}') (idempotent)"
show "coach conversation" "$(code -b /tmp/jar $B/coach/conversation)"
show "coach message" "$(code -b /tmp/jar -X POST $B/coach/message -H "$J" -d '{"text":"What should I work on?"}')"; node -pe "'    '+JSON.parse(require('fs').readFileSync('/tmp/out')).reply.content"
show "coach plan" "$(code -b /tmp/jar -X POST $B/coach/plan)"; node -e "const p=JSON.parse(require('fs').readFileSync('/tmp/out'));p.steps.forEach(s=>console.log('   ',s.kind,'|',s.title));require('fs').writeFileSync('/tmp/step',p.steps[0].id)"
show "plan step done" "$(code -b /tmp/jar -X PATCH $B/coach/plan/$(cat /tmp/step) -H "$J" -d '{"done":true}')"
# --- isolation: a second user must not see the first user's data ---
code -c /tmp/jar2 -X POST $B/auth/register -H "$J" -d '{"name":"Other","email":"o@x.io","password":"correct-horse-2"}' >/dev/null
show "other user: get my resume" "$(code -b /tmp/jar2 $B/resumes/$RID) (want 404)"
show "other user: patch my app" "$(code -b /tmp/jar2 -X PATCH $B/applications/$AID -H "$J" -d '{"notes":"x"}') (want 404)"
show "other user: my interview" "$(code -b /tmp/jar2 $B/interview/sessions/$SID) (want 404)"
show "other user: ats on my resume" "$(code -b /tmp/jar2 -X POST $B/ats/analyze -H "$J" -d "{\"resumeId\":\"$RID\",\"jobDescription\":\"$JD\"}") (want 404)"
show "other user: coach plan" "$(code -b /tmp/jar2 -X POST $B/coach/plan) (want 422, no analysis)"
show "refresh" "$(code -b /tmp/jar -c /tmp/jar -X POST $B/auth/refresh)"
show "old refresh reused" "$(code -b /tmp/oldjar -X POST $B/auth/refresh) (no cookie: 401)"
show "logout" "$(code -b /tmp/jar -c /tmp/jar -X POST $B/auth/logout)"
show "me after logout" "$(code -b /tmp/jar $B/auth/me) (want 401)"

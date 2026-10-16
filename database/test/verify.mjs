import { PGlite } from "@electric-sql/pglite";
import { readdirSync, readFileSync } from "node:fs";

const db = new PGlite();
const dir = new URL("../migrations/", import.meta.url);
for (const f of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
  for (const stmt of readFileSync(new URL(f, dir), "utf8").split("--> statement-breakpoint")) {
    if (stmt.trim()) await db.exec(stmt);
  }
}
const tables = (await db.query("select count(*)::int n from information_schema.tables where table_schema='public'")).rows[0].n;

let pass = 0, fail = 0;
const ok = (name, cond) => { cond ? pass++ : fail++; console.log((cond ? "PASS " : "FAIL ") + name); };
const rejects = async (name, sql, params = []) => {
  try { await db.query(sql, params); ok(name, false); } catch { ok(name, true); }
};
const q = async (sql, p = []) => (await db.query(sql, p)).rows;

ok(`creates tables (${tables})`, tables >= 29);

const [u] = await q("insert into users(email,name,password_hash) values('Ann@Example.com','Ann','h') returning id");
const [u2] = await q("insert into users(email,name) values('bob@example.com','Bob') returning id");

await rejects("duplicate email, any case, rejected", "insert into users(email,name) values('ann@example.com','X')");
await rejects("ATS score 101 rejected", "insert into ats_analyses(user_id,job_description,score,breakdown) values($1,'jd',101,'{}')", [u.id]);
await rejects("skill level 6 rejected", "insert into skills(user_id,name,level) values($1,'Go',6)", [u.id]);
await q("insert into skills(user_id,name,level) values($1,'React',4)", [u.id]);
await rejects("skill duplicate differing by case rejected", "insert into skills(user_id,name,level) values($1,'react',3)", [u.id]);
await rejects("file over 10MB rejected", "insert into resume_files(user_id,kind,format,mime_type,storage_key,size_bytes) values($1,'upload','pdf','application/pdf','k1',10485761)", [u.id]);

const [job] = await q("insert into jobs(title,company,skills) values('Dev','Acme','{react,java}') returning id");
await rejects("job match matched > required rejected", "insert into job_matches(user_id,job_id,score,matched_skills,required_skills) values($1,$2,50,5,3)", [u.id, job.id]);
await q("insert into job_matches(user_id,job_id,score,matched_skills,required_skills) values($1,$2,80,4,5)", [u.id, job.id]);
await rejects("one match per user+job", "insert into job_matches(user_id,job_id,score,matched_skills,required_skills) values($1,$2,70,1,2)", [u.id, job.id]);

const [r] = await q("insert into resumes(user_id,title) values($1,'CV') returning id", [u.id]);
await q("insert into resume_versions(user_id,resume_id,version,content) values($1,$2,1,'{}')", [u.id, r.id]);
await rejects("duplicate resume version rejected", "insert into resume_versions(user_id,resume_id,version,content) values($1,$2,1,'{}')", [u.id, r.id]);
const [app] = await q("insert into applications(user_id,resume_id,company,position) values($1,$2,'Acme','Dev') returning id", [u.id, r.id]);
await q("insert into application_events(user_id,application_id,to_stage) values($1,$2,'saved')", [u.id, app.id]);

const [iv] = await q("insert into interviews(user_id,type) values($1,'technical') returning id", [u.id]);
const [qn] = await q("insert into interview_questions(user_id,interview_id,order_index,question) values($1,$2,1,'Why?') returning id", [u.id, iv.id]);
await rejects("duplicate question order rejected", "insert into interview_questions(user_id,interview_id,order_index,question) values($1,$2,1,'Again')", [u.id, iv.id]);
await rejects("answer score 150 rejected", "insert into interview_answers(user_id,question_id,answer,clarity) values($1,$2,'a',150)", [u.id, qn.id]);
await q("insert into interview_answers(user_id,question_id,answer,clarity) values($1,$2,'a',80)", [u.id, qn.id]);

const [cv] = await q("insert into coach_conversations(user_id) values($1) returning id", [u.id]);
await q("insert into coach_messages(user_id,conversation_id,role,content) values($1,$2,'user','hi')", [u.id, cv.id]);
await q("insert into audit_log(user_id,action) values($1,'login')", [u.id]);
await q("insert into contact_messages(user_id,name,email,message) values($1,'Ann','a@b.co','hello there friend')", [u.id]);
await q("insert into resumes(user_id,title) values($1,'Bob CV')", [u2.id]);

// resume deletion keeps the application but clears the link
await q("delete from resumes where id=$1", [r.id]);
ok("deleting a resume keeps the application (resume_id -> null)", (await q("select resume_id from applications where id=$1", [app.id]))[0]?.resume_id === null);

// account deletion cascades everywhere, keeps audit/contact rows with user_id null, leaves other users alone
await q("delete from users where id=$1", [u.id]);
const count = async (t, col = "user_id") => (await q(`select count(*)::int n from ${t} where ${col}=$1`, [u.id]))[0].n;
const owned = ["skills","applications","application_events","interviews","interview_questions","interview_answers","coach_conversations","coach_messages","job_matches","resume_versions"];
let leftovers = 0; for (const t of owned) leftovers += await count(t);
ok("account delete cascades to all owned tables", leftovers === 0);
ok("audit_log row survives with user_id null", (await q("select count(*)::int n from audit_log where action='login' and user_id is null"))[0].n === 1);
ok("contact message survives with user_id null", (await q("select count(*)::int n from contact_messages where user_id is null"))[0].n === 1);
ok("other users' data untouched", (await q("select count(*)::int n from resumes where user_id=$1", [u2.id]))[0].n === 1);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

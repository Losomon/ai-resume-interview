import { Router } from "express"; import { authRouter } from "./auth.routes.js"; import { resumeRouter } from "./resume.routes.js"; import { aiRouter } from "./ai.routes.js"; import { atsRouter } from "./ats.routes.js";
import { interviewRouter } from "./interview.routes.js"; import { applicationRouter } from "./application.routes.js"; import { coachRouter } from "./coach.routes.js"; import { jobRouter } from "./job.routes.js";
export const apiRouter = Router();
apiRouter.use("/auth", authRouter); apiRouter.use("/resumes", resumeRouter); apiRouter.use("/ai", aiRouter); apiRouter.use("/ats", atsRouter);
apiRouter.use("/interview", interviewRouter); apiRouter.use("/applications", applicationRouter); apiRouter.use("/coach", coachRouter); apiRouter.use("/jobs", jobRouter);

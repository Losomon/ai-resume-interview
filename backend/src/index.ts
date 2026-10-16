import { app } from './app';
import { env } from './config/env';

app.listen(env.PORT, () => console.log(`CareerForge API listening on :${env.PORT}`));

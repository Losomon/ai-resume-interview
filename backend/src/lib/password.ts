import bcrypt from "bcryptjs"; // pure JS: installs on Windows with no compiler
const DUMMY = bcrypt.hashSync("not-a-real-password", 12);
export const hashPassword = (p: string) => bcrypt.hash(p, 12);
/** Always does one bcrypt compare, even for unknown users, so timing doesn't reveal which emails exist. */
export const verifyPassword = (p: string, hash?: string) => bcrypt.compare(p, hash ?? DUMMY);

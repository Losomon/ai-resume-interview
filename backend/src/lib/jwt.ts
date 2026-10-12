import jwt from "jsonwebtoken"; import { env } from "../env.js"; import { UnauthorizedError } from "./errors.js";
export const signAccessToken = (userId: string) => jwt.sign({ sub: userId }, env.JWT_SECRET, { algorithm: "HS256", expiresIn: env.ACCESS_TTL_MINUTES * 60 });
export function verifyAccessToken(token: string): string {
  try { return jwt.verify(token, env.JWT_SECRET, { algorithms: ["HS256"] }).sub as string; } catch { throw new UnauthorizedError("Session expired"); }
}

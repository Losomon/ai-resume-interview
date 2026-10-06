import type { RequestHandler } from "express"; import type { z } from "zod";
/** Parses and replaces req.body; ZodError becomes a 400 in the error handler. */
export const validateBody = (schema: z.ZodType): RequestHandler => (req, _res, next) => { req.body = schema.parse(req.body); next(); };
/** For params and query (Express 5 makes req.query read-only, so parse into a new value instead). */
export const parse = <T extends z.ZodType>(schema: T, data: unknown): z.infer<T> => schema.parse(data);

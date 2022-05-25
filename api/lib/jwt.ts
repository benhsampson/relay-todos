import jwt from "jsonwebtoken";

import env from "../env";

export const createIdToken = (id: string) =>
  jwt.sign({}, env.JWT_SECRET, {
    subject: id,
    expiresIn: env.JWT_EXPIRES,
  });

export const verifyIdToken = (token: string) =>
  jwt.verify(token, env.JWT_SECRET, {
    complete: false,
  });

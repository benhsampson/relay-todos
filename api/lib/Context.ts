import { ExpressContext } from "apollo-server-express";

export type ContextParams = ExpressContext;

export type Context = {
  signIn: (userId: string) => void;
  signOut: () => void;
  userId?: string;
};

import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ContextFunction,
} from "apollo-server-core";
import http from "http";
import express from "express";
import cookieParser from "cookie-parser";

import env from "./env";
import { Context, ContextParams } from "./lib/Context";
import { createIdToken } from "./lib/jwt";

import Schema from "./schema";

const context: ContextFunction<ContextParams, Context> = async ({
  req,
  res,
}) => {
  return {
    signIn: (userId) => {
      const token = createIdToken(userId);
      res.cookie(env.JWT_COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: env.JWT_EXPIRES,
      });
    },
    userId: req.cookies && req.cookies[env.JWT_COOKIE],
  };
};

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: Schema,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: true,
  });
  await server.start();
  app.use(cookieParser());
  app.set("trust proxy", env.isDev);
  server.applyMiddleware({
    app,
    cors: {
      origin: [env.FRONTEND_URL, "https://studio.apollographql.com"],
      credentials: true,
    },
  });
  await new Promise<void>((res) => httpServer.listen({ port: env.PORT }, res));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();

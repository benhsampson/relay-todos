import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ContextFunction,
} from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import env from "./env";
import { Context, ContextParams } from "./lib/Context";
import { createIdToken } from "./lib/jwt";

import Schema from "./schema";

const context: ContextFunction<ContextParams, Context> = async ({ res }) => {
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
  };
};

(async () => {
  const app = express();
  // app.use(
  //   cors({
  //     origin: env.FRONTEND_URL,
  //     credentials: true,
  //   })
  // );
  app.use(cookieParser());
  app.set("trust proxy", env.isDev);
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: Schema,
    context,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((res) => httpServer.listen({ port: env.PORT }, res));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();

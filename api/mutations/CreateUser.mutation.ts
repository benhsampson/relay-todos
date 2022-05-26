import {
  GraphQLArgumentConfig,
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import * as yup from "yup";
import argon2 from "argon2";

import { addUser, getUserOrThrow, User } from "../db";
import type { Context } from "../lib/Context";
import { GraphQLUser } from "../nodes/User.node";

type Args = { input: { username: string; password: string }; dryRun?: boolean };

const createUserSchema: yup.SchemaOf<Args> = yup.object({
  input: yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
  dryRun: yup.bool(),
});

const CreateUserMutation: GraphQLFieldConfig<User, Context, Args> = {
  type: new GraphQLObjectType({
    name: "CreateUserPayload",
    fields: {
      user: { type: GraphQLUser },
    },
  }),
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "CreateUserInput",
        fields: {
          username: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
      }),
    },
    dryRun: { type: GraphQLBoolean, defaultValue: false },
  } as Record<keyof Args, GraphQLArgumentConfig>,
  resolve: async (_, args, ctx) => {
    createUserSchema.validateSync(args, { abortEarly: false, strict: true });

    if (args.dryRun) return { user: null };

    args.input.password = await argon2.hash(args.input.password);

    const userId = await addUser(args.input.username, args.input.password);

    ctx.signIn(userId);

    const user = await getUserOrThrow(userId);

    return { user };
  },
};

export default CreateUserMutation;

import { UserInputError } from "apollo-server";
import argon2 from "argon2";
import {
  GraphQLArgumentConfig,
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import invariant from "tiny-invariant";

import { getUserByUsername, User } from "../db";
import { Context } from "../lib/Context";
import { GraphQLUser } from "../nodes/User.node";

type Args = { input: { username: string; password: string } };

const SignInMutation: GraphQLFieldConfig<User, Context, Args> = {
  type: new GraphQLObjectType({
    name: "SignInPayload",
    fields: {
      user: { type: GraphQLUser },
    },
  }),
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "SignInInput",
        fields: {
          username: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
      }),
    },
  } as Record<keyof Args, GraphQLArgumentConfig>,
  resolve: async (_, { input }, ctx) => {
    const user = await getUserByUsername(input.username);

    invariant(user);

    if (!(await argon2.verify(user.password, input.password)))
      throw new UserInputError("Invalid password");

    ctx.signIn(user.id);

    return { user };
  },
};

export default SignInMutation;

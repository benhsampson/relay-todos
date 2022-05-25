import { GraphQLFieldConfig } from "graphql";
import invariant from "tiny-invariant";

import { getUserOrThrow, User } from "../db";
import { Context } from "../lib/Context";
import { GraphQLUser } from "../nodes/User.node";

const UserQuery: GraphQLFieldConfig<User, Context> = {
  description: "Fetches a user",
  type: GraphQLUser,
  resolve: async (_, __, ctx) => {
    invariant(ctx.userId, "Missing user ID");
    console.log(ctx.userId);
    return await getUserOrThrow(ctx.userId);
  },
};

export default UserQuery;

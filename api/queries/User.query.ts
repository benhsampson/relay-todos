import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";

import { getUserOrThrow, User } from "../db";
import { GraphQLUser } from "../nodes/User.node";

type UserQueryInput = { id: string };

const UserQuery: GraphQLFieldConfig<User, {}> = {
  description: "Fetches a user",
  type: GraphQLUser,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { id }: UserQueryInput) => await getUserOrThrow(id),
};

export default UserQuery;

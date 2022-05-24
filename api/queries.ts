import {
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { getUserOrThrow, User } from "./db";
import { GraphQLUser } from "./types";

type UserQueryInput = { id: string };

const UserQuery: GraphQLFieldConfig<User, {}> = {
  description: "Fetches a user",
  type: GraphQLUser,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { id }: UserQueryInput) => await getUserOrThrow(id),
};

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: UserQuery,
  },
});

export default Query;

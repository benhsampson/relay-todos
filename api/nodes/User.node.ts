import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
  globalIdField,
} from "graphql-relay";

import { nodeInterface } from ".";
import { getTodos, User } from "../db";
import { TodosConnection } from "./Todo.node";

type Status = "any" | "completed";

export const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: {
    id: globalIdField("User"),
    userDbId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (self: User) => self.id,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    todos: {
      type: TodosConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: "any",
        },
        ...connectionArgs,
      },
      resolve: async (
        self: User,
        { status, ...args }: ConnectionArguments & { status: Status }
      ) => connectionFromArray([...(await getTodos(self.id, status))], args),
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (self: User) => (await getTodos(self.id)).length,
    },
    completedCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async (self: User) =>
        (await getTodos(self.id, "completed")).length,
    },
  },
  interfaces: [nodeInterface],
});

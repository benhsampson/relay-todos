import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
} from "graphql-relay";

import { nodeInterface } from ".";
import { getTodos, USER_ID } from "../db";
import { TodosConnection } from "./Todo.node";

type Status = "any" | "completed";

export const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: () => USER_ID,
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
        _,
        { status, ...args }: ConnectionArguments & { status: Status }
      ) => connectionFromArray([...(await getTodos(status))], args),
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async () => (await getTodos()).length,
    },
    completedCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async () => (await getTodos("completed")).length,
    },
  },
  interfaces: [nodeInterface],
});

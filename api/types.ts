import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  connectionArgs,
  ConnectionArguments,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from "graphql-relay";

import { getTodo, getTodos, getUserOrThrow, Todo, User, USER_ID } from "./db";

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId) => {
    const { id, type } = fromGlobalId(globalId);
    switch (type) {
      case "User":
        return getUserOrThrow(id);
      case "Todo":
        return getTodo(id);
      default:
        return null;
    }
  },
  (obj): string | undefined => {
    if (obj instanceof User) return "User";
    else if (obj instanceof Todo) return "Todo";
  }
);

export const GraphQLTodo = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id: globalIdField("Todo"),
    text: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (todo: Todo) => todo.text,
    },
    complete: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (todo: Todo) => todo.complete,
    },
  },
  interfaces: [nodeInterface],
});

const { connectionType: TodosConnection, edgeType: GraphQLTodoEdge } =
  connectionDefinitions({
    name: "Todo",
    nodeType: GraphQLTodo,
  });

export { GraphQLTodoEdge };

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

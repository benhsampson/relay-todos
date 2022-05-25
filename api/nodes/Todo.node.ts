import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";

import { nodeInterface } from ".";
import { Todo } from "../db";

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

export { GraphQLTodoEdge, TodosConnection };

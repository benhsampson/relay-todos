import {
  GraphQLID,
  GraphQLInputFieldConfig,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from "graphql-relay";

import { addTodo, getTodo, getTodos, getUserOrThrow } from "../db";
import { GraphQLTodoEdge } from "../nodes/Todo.node";
import { GraphQLUser } from "../nodes/User.node";

type Input = {
  text: string;
  userId: string;
};

type Payload = {
  todoId: string;
  userId: string;
};

const AddTodoMutation = mutationWithClientMutationId({
  name: "AddTodo",
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  } as Record<keyof Input, GraphQLInputFieldConfig>,
  mutateAndGetPayload: async ({ text, userId }: Input) => {
    const todoId = await addTodo(text, userId, false);
    return { todoId, userId } as Payload;
  },
  outputFields: {
    todoEdge: {
      type: new GraphQLNonNull(GraphQLTodoEdge),
      resolve: async ({ todoId, userId }: Payload) => {
        const todo = await getTodo(todoId);
        return {
          cursor: cursorForObjectInConnection(
            [...(await getTodos(userId))],
            todo
          ),
          node: todo,
        };
      },
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }: Payload) => getUserOrThrow(userId),
    },
  },
});

export default AddTodoMutation;

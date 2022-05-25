import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputFieldConfig,
  GraphQLNonNull,
} from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";

import { changeTodoStatus, getTodo, getUserOrThrow } from "../db";
import { GraphQLTodo } from "../nodes/Todo.node";
import { GraphQLUser } from "../nodes/User.node";

type Input = {
  complete: boolean;
  id: string;
  userId: string;
};

type Payload = {
  todoId: string;
  userId: string;
};

const ChangeTodoStatusMutation = mutationWithClientMutationId({
  name: "ChangeTodoStatus",
  inputFields: {
    complete: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  } as Record<keyof Input, GraphQLInputFieldConfig>,
  outputFields: {
    todo: {
      type: new GraphQLNonNull(GraphQLTodo),
      resolve: ({ todoId }: Payload) => getTodo(todoId),
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }: Payload) => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: async ({ complete, id, userId }: Input) => {
    const todoId = fromGlobalId(id).id;
    await changeTodoStatus(todoId, complete);
    return { todoId, userId } as Payload;
  },
});

export default ChangeTodoStatusMutation;

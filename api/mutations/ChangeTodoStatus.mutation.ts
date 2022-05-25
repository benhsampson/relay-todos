import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputFieldConfig,
  GraphQLNonNull,
} from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import invariant from "tiny-invariant";

import { changeTodoStatus, getTodo, getUserOrThrow } from "../db";
import { Context } from "../lib/Context";
import { GraphQLTodo } from "../nodes/Todo.node";
import { GraphQLUser } from "../nodes/User.node";

type Input = {
  complete: boolean;
  id: string;
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
  mutateAndGetPayload: async ({ complete, id }: Input, ctx: Context) => {
    invariant(ctx.userId);
    const todoId = fromGlobalId(id).id;
    await changeTodoStatus(todoId, complete);
    return { todoId, userId: ctx.userId } as Payload;
  },
});

export default ChangeTodoStatusMutation;

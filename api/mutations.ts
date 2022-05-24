import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputFieldConfig,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  cursorForObjectInConnection,
  fromGlobalId,
  mutationWithClientMutationId,
} from "graphql-relay";
import {
  addTodo,
  changeTodoStatus,
  getTodo,
  getTodos,
  getUserOrThrow,
} from "./db";
import { GraphQLTodo, GraphQLTodoEdge, GraphQLUser } from "./types";

type AddTodoInput = {
  text: string;
  userId: string;
};

type AddTodoPayload = {
  todoId: string;
  userId: string;
};

const AddTodoMutation = mutationWithClientMutationId({
  name: "AddTodo",
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  } as Record<keyof AddTodoInput, GraphQLInputFieldConfig>,
  outputFields: {
    todoEdge: {
      type: new GraphQLNonNull(GraphQLTodoEdge),
      resolve: async ({ todoId }: AddTodoPayload) => {
        const todo = await getTodo(todoId);
        return {
          cursor: cursorForObjectInConnection([...(await getTodos())], todo),
          node: todo,
        };
      },
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }: AddTodoPayload) => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: async ({ text, userId }: AddTodoInput) => {
    const todoId = await addTodo(text, false);
    return { todoId, userId } as AddTodoPayload;
  },
});

type ChangeTodoStatusInput = {
  complete: boolean;
  id: string;
  userId: string;
};

type ChangeTodoStatusPayload = {
  todoId: string;
  userId: string;
};

const ChangeTodoStatusMutation = mutationWithClientMutationId({
  name: "ChangeTodoStatus",
  inputFields: {
    complete: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  } as Record<keyof ChangeTodoStatusInput, GraphQLInputFieldConfig>,
  outputFields: {
    todo: {
      type: new GraphQLNonNull(GraphQLTodo),
      resolve: ({ todoId }: ChangeTodoStatusPayload) => getTodo(todoId),
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }: ChangeTodoStatusPayload) => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: async ({
    complete,
    id,
    userId,
  }: ChangeTodoStatusInput) => {
    const todoId = fromGlobalId(id).id;
    await changeTodoStatus(todoId, complete);
    return { todoId, userId } as ChangeTodoStatusPayload;
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: AddTodoMutation,
    changeTodoStatus: ChangeTodoStatusMutation,
  },
});

export default Mutation;

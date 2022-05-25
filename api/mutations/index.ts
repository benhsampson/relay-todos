import { GraphQLObjectType } from "graphql";

import AddTodoMutation from "./AddTodo.mutation";
import ChangeTodoStatusMutation from "./ChangeTodoStatus.mutation";
import CreateUserMutation from "./CreateUser.mutation";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: AddTodoMutation,
    changeTodoStatus: ChangeTodoStatusMutation,
    createUser: CreateUserMutation,
  },
});

export default Mutation;

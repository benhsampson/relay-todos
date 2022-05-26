import { GraphQLObjectType } from "graphql";

import AddTodoMutation from "./AddTodo.mutation";
import ChangeTodoStatusMutation from "./ChangeTodoStatus.mutation";
import CreateUserMutation from "./CreateUser.mutation";
import SignInMutation from "./SignIn.mutation";
import SignOutMutation from "./SignOut.mutation";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: AddTodoMutation,
    changeTodoStatus: ChangeTodoStatusMutation,
    createUser: CreateUserMutation,
    signIn: SignInMutation,
    signOut: SignOutMutation,
  },
});

export default Mutation;

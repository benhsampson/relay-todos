import { GraphQLObjectType } from "graphql";

import AddTodoMutation from "./AddTodo.mutation";
import ChangeTodoStatusMutation from "./ChangeTodoStatus.mutation";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: AddTodoMutation,
    changeTodoStatus: ChangeTodoStatusMutation,
  },
});

export default Mutation;

// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { Suspense, useCallback } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";

import { TodoAppQuery } from "./__generated__/TodoAppQuery.graphql";
import TodoList from "./TodoList";
import useAddTodoMutation from "./useAddTodoMutation";
import TodoTextInput from "./TodoTextInput";

type Props = {
  initialQueryRef: PreloadedQuery<TodoAppQuery>;
};

function TodoApp(props: Props) {
  const data = usePreloadedQuery(
    graphql`
      query TodoAppQuery($userId: String!) {
        user(id: $userId) {
          id
          ...TodoList_user
        }
      }
    `,
    props.initialQueryRef
  );

  const [addTodo] = useAddTodoMutation();

  const handleTextInputSave = useCallback(
    (text: string) => addTodo(text, data.user!.id),
    [addTodo, data.user!.id]
  );

  return (
    <div>
      <header>
        <h1>todos {data.user!.id}</h1>
      </header>
      <TodoTextInput onSave={handleTextInputSave} />
      <TodoList user={data.user!} />
    </div>
  );
}

export default function TodoAppWrapper(props: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoApp {...props} />
    </Suspense>
  );
}

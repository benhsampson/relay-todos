// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { Suspense, useCallback } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import invariant from "tiny-invariant";

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
          userDbId
          totalCount
          completedCount
          ...TodoList_user
        }
      }
    `,
    props.initialQueryRef
  );

  const [addTodo] = useAddTodoMutation();

  const handleTextInputSave = useCallback(
    (text: string) => {
      invariant(data.user);
      addTodo(text, data.user.id, data.user.userDbId);
    },
    [addTodo, data.user]
  );

  return (
    <div>
      <header>
        <h1>
          todos @{data.user!.id} ({data.user?.completedCount}/
          {data.user?.totalCount})
        </h1>
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

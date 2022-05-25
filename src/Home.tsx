// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { Suspense, useCallback } from "react";
import { loadQuery, PreloadedQuery, usePreloadedQuery } from "react-relay";
import invariant from "tiny-invariant";

import * as HomeQuery from "./__generated__/HomeQuery.graphql";
import TodoList from "./TodoList";
import useAddTodoMutation from "./useAddTodoMutation";
import TodoTextInput from "./TodoTextInput";
import TodoAppEnvironment from "./TodoAppEnvironment";

type Props = {
  initialQueryRef: PreloadedQuery<HomeQuery.HomeQuery>;
};

function Home(props: Props) {
  const data = usePreloadedQuery(
    graphql`
      query HomeQuery {
        user {
          id
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
      addTodo(text, data.user.id);
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

export default function IndexWrapper() {
  const initialQueryRef = loadQuery<HomeQuery.HomeQuery>(
    TodoAppEnvironment,
    HomeQuery.default,
    {}
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home initialQueryRef={initialQueryRef} />
    </Suspense>
  );
}

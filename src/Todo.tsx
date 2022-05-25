// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { SyntheticEvent, useCallback } from "react";
import { useFragment } from "react-relay";
import useChangeTodoStatusMutation from "./useChangeTodoStatusMutation";

import { Todo_todo$key } from "./__generated__/Todo_todo.graphql";
import { Todo_user$key } from "./__generated__/Todo_user.graphql";

type Props = {
  todo: Todo_todo$key;
  user: Todo_user$key;
};

export default function Todo(props: Props) {
  const todo = useFragment(
    graphql`
      fragment Todo_todo on Todo {
        id
        text
        complete
      }
    `,
    props.todo
  );

  const user = useFragment(
    graphql`
      fragment Todo_user on User {
        id
        userDbId
        completedCount
      }
    `,
    props.user
  );

  const [changeTodoStatus] = useChangeTodoStatusMutation();

  const handleTodoCompleteChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) =>
      changeTodoStatus({
        complete: e.currentTarget.checked,
        userId: user.id,
        userDbId: user.userDbId,
        todoId: todo.id,
        completedCount: user.completedCount,
      }),
    [changeTodoStatus, user.id, user.userDbId, todo.id, user.completedCount]
  );

  return (
    <li>
      <div>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoCompleteChange}
        />
        {todo.text}
        {todo.complete ? <span>&#9745;</span> : ""}
        {` @${user.id}`}
      </div>
    </li>
  );
}

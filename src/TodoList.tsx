// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";

import { TodoList_user$key } from "./__generated__/TodoList_user.graphql";
import Todo from "./Todo";

interface Props {
  user: TodoList_user$key;
}

export default function TodoList(props: Props) {
  const user = useFragment(
    graphql`
      fragment TodoList_user on User {
        todos(first: 2147483647) @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              ...Todo_todo
            }
          }
        }
        id
        ...Todo_user
      }
    `,
    props.user
  );

  const nodes = user.todos ? user.todos.edges?.map((edge) => edge?.node) : [];

  return (
    <section>
      <ul>
        {nodes?.map((node) => (
          <Todo key={node?.id} todo={node!} user={user} />
        ))}
      </ul>
    </section>
  );
}

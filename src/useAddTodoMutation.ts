// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useCallback } from "react";
import type { RecordSourceSelectorProxy } from "relay-runtime";
import { ConnectionHandler } from "relay-runtime";
import { useMutation } from "react-relay";

import type {
  AddTodoInput,
  useAddTodoMutation as useAddTodoMutationType,
  useAddTodoMutation$data,
} from "./__generated__/useAddTodoMutation.graphql";

const mutation = graphql`
  mutation useAddTodoMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge {
        node {
          id
          text
          complete
        }
        cursor
      }
    }
  }
`;

export default function useAddTodoMutation() {
  const [commit] = useMutation<useAddTodoMutationType>(mutation);
  return [
    useCallback(
      (text: string, userId: string) => {
        const input: AddTodoInput = { text, userId };
        return commit({
          variables: {
            input,
          },

          // if the updates we want to perform are more complex than just
          // updating the values of fields, they cannot be handled by declarative
          // mutation directives; the updater function offers full control over
          // how to update the store
          updater: (
            store: RecordSourceSelectorProxy<useAddTodoMutation$data>
          ) => {
            // get the edge inside of the payload
            const payload = store.getRootField("addTodo");
            if (!payload) return;
            const newEdge = payload.getLinkedRecord("todoEdge");
            if (!newEdge) return;

            // get query record to update
            const userProxy = store.get(userId);
            if (!userProxy) return;
            console.log(userProxy);

            // get connection record and add edge
            const connection = ConnectionHandler.getConnection(
              userProxy,
              "TodoList_todos"
            );
            if (!connection) return;
            ConnectionHandler.insertEdgeAfter(connection, newEdge);
          },
        });
      },
      [commit]
    ),
  ];
}

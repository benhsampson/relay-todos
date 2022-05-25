// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useCallback } from "react";
import type { RecordProxy, RecordSourceSelectorProxy } from "relay-runtime";
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
        cursor
        node {
          id
          text
          complete
        }
      }
      user {
        id
        totalCount
      }
    }
  }
`;

let tempId = 0;

const sharedUpdater = (
  store: RecordSourceSelectorProxy<useAddTodoMutation$data>,
  userId: string,
  newEdge: RecordProxy
) => {
  // get query record to update
  const userProxy = store.get(userId);
  if (!userProxy) return;

  // get connection record and add edge
  const connection = ConnectionHandler.getConnection(
    userProxy,
    "TodoList_todos"
  );
  if (!connection) return;
  ConnectionHandler.insertEdgeAfter(connection, newEdge);
};

export default function useAddTodoMutation() {
  const [commit] = useMutation<useAddTodoMutationType>(mutation);
  return [
    useCallback(
      (text: string, userId: string) => {
        const input: AddTodoInput = { text };
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

            sharedUpdater(store, userId, newEdge);
          },

          // if we can't statically predict what the server response will be,
          // provide an optimisticUpdater function
          optimisticUpdater: (
            store: RecordSourceSelectorProxy<useAddTodoMutation$data>
          ) => {
            const id = `client:newTodo:${tempId++}`;
            const node = store.create(id, "Todo");
            node.setValue(text, "text");
            node.setValue(id, "id");
            const newEdge = store.create(
              `client:newEdge:${tempId++}`,
              "TodoEdge"
            );
            newEdge.setLinkedRecord(node, "node");
            sharedUpdater(store, userId, newEdge);

            const userProxy = store.get(userId);
            if (!userProxy) return;
            const totalCount = userProxy.getValue("totalCount");
            if (typeof totalCount !== "number") return;
            userProxy.setValue(totalCount + 1, "totalCount");
          },
        });
      },
      [commit]
    ),
  ];
}

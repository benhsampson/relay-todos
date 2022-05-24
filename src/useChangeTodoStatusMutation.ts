// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { useMutation } from "react-relay";
import type { useChangeTodoStatusMutation as useChangeTodoStatusMutationType } from "./__generated__/useChangeTodoStatusMutation.graphql";

const mutation = graphql`
  mutation useChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
    changeTodoStatus(input: $input) {
      todo {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }
`;

export default function useChangeTodoStatusMutation() {
  const [commit] = useMutation<useChangeTodoStatusMutationType>(mutation);
  return [
    useCallback(
      (input: { complete: boolean; todoId: string; userId: string }) => {
        return commit({
          variables: {
            input: {
              complete: input.complete,
              id: input.todoId,
              userId: input.userId,
            },
          },
        });
      },
      [commit]
    ),
  ];
}

// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { useMutation } from "react-relay";
import type { useCreateUserMutation as mutationType } from "./__generated__/useCreateUserMutation.graphql";

const useCreateUserMutation = (onSuccess = () => {}) => {
  const [commit] = useMutation<mutationType>(graphql`
    mutation useCreateUserMutation($input: CreateUserInput) {
      createUser(input: $input) {
        user {
          id
          username
        }
      }
    }
  `);
  return [
    useCallback(
      (username: string, password: string) => {
        commit({
          variables: { input: { username, password } },
          updater: (store) => {
            store.invalidateStore();
          },
          onCompleted: () => {
            setTimeout(onSuccess, 0);
          },
        });
      },
      [commit, onSuccess]
    ),
  ];
};

export default useCreateUserMutation;

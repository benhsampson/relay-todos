// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { useMutation } from "react-relay";
import { RecordSourceSelectorProxy } from "relay-runtime";

import {
  useSignInMutation as mutationType,
  useSignInMutation$data,
} from "./__generated__/useSignInMutation.graphql";

const useSignInMutation = (onSuccess = () => {}) => {
  const [commit] = useMutation<mutationType>(graphql`
    mutation useSignInMutation($input: SignInInput) {
      signIn(input: $input) {
        user {
          id
        }
      }
    }
  `);
  return [
    useCallback(
      (username: string, password: string) => {
        return commit({
          variables: { input: { username, password } },
          updater: (
            store: RecordSourceSelectorProxy<useSignInMutation$data>
          ) => {
            // FIXME: Fix this crude solution
            store.invalidateStore();
          },
          onCompleted: () => {
            setTimeout(onSuccess, 500);
          },
        });
      },
      [commit, onSuccess]
    ),
  ];
};

export default useSignInMutation;

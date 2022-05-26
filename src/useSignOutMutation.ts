// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { useMutation } from "react-relay";
import { useSignOutMutation as mutType } from "./__generated__/useSignOutMutation.graphql";

const useSignOutMutation = (onSuccess = () => {}) => {
  const [commit] = useMutation<mutType>(graphql`
    mutation useSignOutMutation {
      signOut
    }
  `);

  return [
    useCallback(
      () =>
        commit({
          variables: {},
          updater: (store) => {
            store.invalidateStore();
          },
          onCompleted: onSuccess,
        }),
      [commit, onSuccess]
    ),
  ];
};

export default useSignOutMutation;

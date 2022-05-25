// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useCallback } from "react";
import { useMutation } from "react-relay";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "./LocationState";
import type { useCreateUserMutation as mutationType } from "./__generated__/useCreateUserMutation.graphql";

const useCreateUserMutation = (routeToFrom = true, routeTo = "/") => {
  const navigate = useNavigate();
  const location = useLocation();
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
          onCompleted: (response, errors) => {
            console.log(response, errors);
            setTimeout(() => {
              navigate(
                routeToFrom
                  ? (location.state as LocationState)?.from?.pathname || routeTo
                  : routeTo
              );
            }, 1000);
          },
        });
      },
      [commit, navigate, routeToFrom, location.state, routeTo]
    ),
  ];
};

export default useCreateUserMutation;

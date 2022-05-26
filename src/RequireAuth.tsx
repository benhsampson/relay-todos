// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { Navigate, useLocation } from "react-router-dom";
import { LocationState } from "./LocationState";

import * as RequireAuthQuery from "./__generated__/RequireAuthQuery.graphql";

type Props = {
  children: React.ReactNode;
};

export default function RequireAuthInner(props: Props) {
  const data = useLazyLoadQuery<RequireAuthQuery.RequireAuthQuery>(
    graphql`
      query RequireAuthQuery {
        authenticated
      }
    `,
    {}
  );

  const location = useLocation();

  if (!data.authenticated)
    return (
      <Navigate
        to="/sign-in"
        state={{ from: location } as LocationState}
        replace
      />
    );

  return <>{props.children}</>;
}

// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import { Navigate, useLocation } from "react-router-dom";
import { LocationState } from "./LocationState";

import * as RequireAuthQuery from "./__generated__/RequireAuthQuery.graphql";

type Props = {
  children: React.ReactNode;
};

function RequireAuthInner(props: Props) {
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

export default function RequireAuth(props: Props) {
  return (
    <Suspense>
      <RequireAuthInner {...props} />
    </Suspense>
  );
}

// @ts-ignore
import graphql from "babel-plugin-relay/macro";
import { Suspense } from "react";
import {
  loadQuery,
  PreloadedQuery,
  useLazyLoadQuery,
  usePreloadedQuery,
} from "react-relay";
import { Navigate, useLocation } from "react-router-dom";

import TodoAppEnvironment from "./TodoAppEnvironment";
import * as RequireAuthQuery from "./__generated__/RequireAuthQuery.graphql";

type Props = {
  // queryRef: PreloadedQuery<RequireAuthQuery.RequireAuthQuery>;
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
    return <Navigate to="/sign-in" state={{ from: location }} replace />;

  return <>{props.children}</>;
}

// const authenticatedQueryRef = loadQuery<RequireAuthQuery.RequireAuthQuery>(
//   TodoAppEnvironment,
//   RequireAuthQuery.default,
//   {}
// );

// export default function RequireAuth(props: Pick<Props, "children">) {
//   return (
//     <Suspense>
//       <RequireAuthInner queryRef={authenticatedQueryRef} {...props} />
//     </Suspense>
//   );
// }

import { GraphQLObjectType } from "graphql";
import AuthenticatedQuery from "./Authenticated.query";

import UserQuery from "./User.query";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    authenticated: AuthenticatedQuery,
    user: UserQuery,
  },
});

export default Query;

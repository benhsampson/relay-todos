import { GraphQLObjectType } from "graphql";

import UserQuery from "./User.query";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: UserQuery,
  },
});

export default Query;

import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from "graphql";

import { Context } from "../lib/Context";

const AuthenticatedQuery: GraphQLFieldConfig<{}, Context> = {
  type: new GraphQLNonNull(GraphQLBoolean),
  resolve: (_, __, ctx) => {
    return !!ctx.userId;
  },
};

export default AuthenticatedQuery;

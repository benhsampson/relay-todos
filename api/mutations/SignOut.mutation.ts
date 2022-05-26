import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from "graphql";

import { Context } from "../lib/Context";

const SignOutMutation: GraphQLFieldConfig<{}, Context> = {
  type: new GraphQLNonNull(GraphQLBoolean),
  resolve: async (_, __, ctx) => {
    ctx.signOut();
    return true;
  },
};

export default SignOutMutation;

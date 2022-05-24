import { GraphQLSchema } from "graphql";

import Query from "./queries";
import Mutation from "./mutations";

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;

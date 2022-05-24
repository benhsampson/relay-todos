import { ApolloServer } from "apollo-server";

import Schema from "./schema";

const server = new ApolloServer({
  schema: Schema,
  csrfPrevention: true,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

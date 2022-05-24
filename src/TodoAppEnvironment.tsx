import {
  CacheConfig,
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";

async function fetchRelay(
  params: RequestParameters,
  variables: Variables,
  _cacheConfig: CacheConfig
) {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const json = await response.json();

  if (Array.isArray(json.errors)) {
    throw new Error(
      `Error fetching GraphQL query ${
        params.name
      } with variables ${JSON.stringify(variables)}: ${JSON.stringify(
        json.errors
      )}`
    );
  }

  return json;
}

const TodoAppEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

export default TodoAppEnvironment;

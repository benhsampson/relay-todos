import React from "react";
import ReactDOM from "react-dom/client";
import { loadQuery, RelayEnvironmentProvider } from "react-relay";

import reportWebVitals from "./reportWebVitals";
import TodoAppWrapper from "./TodoApp";
import TodoAppEnvironment from "./TodoAppEnvironment";
import * as TodoAppQuery from "./__generated__/TodoAppQuery.graphql";

const initialQueryRef = loadQuery<TodoAppQuery.TodoAppQuery>(
  TodoAppEnvironment,
  TodoAppQuery.default,
  { userId: "0" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={TodoAppEnvironment}>
      <TodoAppWrapper initialQueryRef={initialQueryRef} />
    </RelayEnvironmentProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

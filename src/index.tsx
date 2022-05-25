import React from "react";
import ReactDOM from "react-dom/client";
import { RelayEnvironmentProvider } from "react-relay";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import TodoApp from "./TodoApp";
import TodoAppEnvironment from "./TodoAppEnvironment";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={TodoAppEnvironment}>
      <BrowserRouter>
        <TodoApp />
      </BrowserRouter>
    </RelayEnvironmentProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

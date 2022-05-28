import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import CreateUser from "./CreateUser";
import Header from "./Header";
import RequireAuth from "./RequireAuth";
import SignIn from "./SignIn";

const HomeRoute = React.lazy(() => import("./Home"));

export default function TodoApp() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Suspense fallback={<div>Loading dynamic...</div>}>
                  <HomeRoute />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  );
}

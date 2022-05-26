import { Route, Routes } from "react-router-dom";

import CreateUser from "./CreateUser";
import Header from "./Header";
import Home from "./Home";
import RequireAuth from "./RequireAuth";
import SignIn from "./SignIn";

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
                <Home />
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

import { Route, Routes } from "react-router-dom";
import CreateUser from "./CreateUser";
import Home from "./Home";
import RequireAuth from "./RequireAuth";

export default function TodoApp() {
  return (
    <div>
      <header>
        <h1>todos!</h1>
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
          <Route path="/sign-in" element={<></>} />
        </Routes>
      </header>
    </div>
  );
}

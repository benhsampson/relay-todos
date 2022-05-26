import { useState } from "react";
import { Link } from "react-router-dom";

import useCreateUserMutation from "./useCreateUserMutation";
import useGoToFrom from "./useGoToFrom";

export default function CreateUser() {
  const [goToFrom] = useGoToFrom();
  const [createUser] = useCreateUserMutation(goToFrom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
        />
        <button type="submit">create</button>
        <Link to="/sign-in">sign in</Link>
      </form>
    </div>
  );
}

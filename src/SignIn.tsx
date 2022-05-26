import { useState } from "react";
import { Link } from "react-router-dom";

import useSignInMutation from "./useSignInMutation";
import useGoToFrom from "./useGoToFrom";

export default function SignIn() {
  const [goToFrom] = useGoToFrom();
  const [signIn] = useSignInMutation(goToFrom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">sign in</button>
        <Link to="/create-user">create user</Link>
      </form>
    </div>
  );
}

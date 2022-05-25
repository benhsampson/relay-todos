import { useState } from "react";
import { Link } from "react-router-dom";

import useCreateUserMutation from "./useCreateUserMutation";

export default function CreateUser() {
  const [createUser] = useCreateUserMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(username, password);
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
        <button type="submit">create</button>
        <Link to="/sign-in">sign in</Link>
      </form>
    </div>
  );
}

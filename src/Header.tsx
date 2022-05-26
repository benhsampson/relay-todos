import { useNavigate } from "react-router-dom";
import useSignOutMutation from "./useSignOutMutation";

export default function Header() {
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation(() => navigate("/sign-in"));
  return (
    <header>
      <h1>todos!</h1>
      <button onClick={signOut}>sign out</button>
    </header>
  );
}

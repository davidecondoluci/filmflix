import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

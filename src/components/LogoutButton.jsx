import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <button onClick={handleLogout} className="hover:underline">
      Logout
    </button>
  );
};

export default LogoutButton;

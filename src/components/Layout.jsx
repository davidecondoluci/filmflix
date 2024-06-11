import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="border-8 border-blue-500 min-h-screen">
      <div className="flex py-2 px-4 border-b border-black justify-between">
        <div className="flex items-center gap-x-2">
          <a href="/">Archive</a>
          <a href="/wishlist/">Wishlist</a>
        </div>
        <div className="flex items-center gap-x-2">
          {user ? <LogoutButton /> : <a href="/login">Login</a>}

          <a href="/register">Register</a>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;

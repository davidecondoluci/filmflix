import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <div className="absolute flex w-full p-4 border-b border-black justify-between bg-white">
        <div className="flex items-center gap-x-4">
          <a href="/" className="hover:underline">
            Archive
          </a>
          <a href="/wishlist/" className="hover:underline">
            Wishlist
          </a>
        </div>
        <div className="flex items-center gap-x-4">
          {user ? (
            <LogoutButton />
          ) : (
            <a href="/login" className="hover:underline">
              Login
            </a>
          )}

          <a href="/register" className="hover:underline">
            Register
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;

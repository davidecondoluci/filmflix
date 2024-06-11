import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="border-8 border-blue-500 min-h-screen">
      <div className="flex py-2 px-4 border-b border-black justify-center gap-x-2">
        <a href="/">Archive</a>
        <a href="/wishlist/">Wishlist</a>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="border-8 border-blue-500 min-h-screen">
      <Outlet />
    </div>
  );
};

export default Layout;

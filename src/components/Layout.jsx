import { Outlet } from "react-router-dom";

const Layout = () => {
  const style = {
    border: "8px solid blue",
    minHeight: "100svh",
  };
  return (
    <div style={style}>
      <Outlet />
    </div>
  );
};

export default Layout;

import "./App.css";

import { Route, Routes } from "react-router-dom";

import Archive from "./pages/Archive";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Archive />} />
    </Routes>
  );
};

export default App;

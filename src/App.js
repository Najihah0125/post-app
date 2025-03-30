import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Details from "./pages/Details";
import { useState } from "react";
import { AuthContext } from "./helpers/authContext";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const [role, setRole] = useState("");

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

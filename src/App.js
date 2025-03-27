import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Details from "./pages/Details";
import { useState } from "react";
import { AuthContext } from "./helpers/authContext";

function App() {
  const [role, setRole] = useState("");

  return (
    <AuthContext.Provider value={{ setRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

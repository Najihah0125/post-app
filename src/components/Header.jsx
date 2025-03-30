import React, { useContext, useState } from "react";
import Button from "./Button";
import { AuthContext } from "../helpers/authContext";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const { setRole } = useContext(AuthContext);
  const checkLoggedIn = localStorage.getItem("logged");

  // handle logout
  const handleLogout = async () => {
    localStorage.removeItem("logged");
    setRole("");
    // navigate("/posts");
  };

  return (
    <div className="flex justify-between text-2xl items-center bg-white p-5 px-10 shadow-sm fixed w-full">
      <p
        className="font-bold text hover:cursor-pointer"
        onClick={() => navigate("/posts")}
      >
        Posts
      </p>
      {!checkLoggedIn ? (
        <Button
          label="Login"
          type="button"
          className="primary-button"
          onClick={() => navigate("/")}
          isDirty={true}
        />
      ) : (
        <Button
          label="Logout"
          type="button"
          className="primary-button"
          onClick={() => handleLogout()}
          isDirty={true}
        />
      )}
    </div>
  );
};

export default Header;

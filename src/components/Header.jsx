import React from "react";
import Button from "./Button";
import { SignOut } from "@phosphor-icons/react";

const Header = () => {
  return (
    <div className="flex justify-between text-2xl items-center bg-indigo-100 p-5 px-10 shadow-sm fixed w-full">
      <p className="font-bold text">Posts</p>
      <Button
        label="Logout"
        type="button"
        className="primary-button"
        onClick={null}
        isDirty={true}
      />
    </div>
  );
};

export default Header;

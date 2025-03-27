import { Eye, EyeClosed, XCircle } from "@phosphor-icons/react";
import React, { useState } from "react";

const Input = ({ label, name, type, register, validation, error, readOnly }) => {
    const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState("eyeClosed");

    // handle show/hide password input
  const handleToggle = () => {
    if (passwordType === "password") {
      setIcon("eyeOpened");
      setPasswordType("text");
    } else {
      setIcon("eyeClosed");
      setPasswordType("password");
    }
  };

  return (
    <div className="flex flex-col space-y-1 w-full">
      <p className="text-sm font-semibold">{label}</p>
      <div className="flex items-center space-x-3 rounded-xl">
        <input
          className="w-full p-3 rounded-xl border text-gray-700 focus:outline-indigo-600"
          type={type === 'password' ? passwordType : type}
          name={name}
          {...register(name, validation)}
          readOnly={readOnly}
        />
        {/* Show/Hide Password */}
        {type === "password" && (
          <div
            className="rounded-full border p-1 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleToggle()}
          >
            {icon === "eyeOpened" ? <Eye /> : <EyeClosed />}
          </div>
        )}
      </div>
      {error && (
        <div className="error-message">
          <XCircle size={18} />
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default Input;

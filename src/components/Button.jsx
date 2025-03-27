import React from "react";

const Button = ({ label, type, className, onClick, isDirty }) => {
  return (
    <button
      className={isDirty === true ? className : "disabled-button"}
      type={type}
      onClick={onClick ? onClick : undefined}
      disabled={!isDirty}
    >
      {label}
    </button>
  );
};

export default Button;

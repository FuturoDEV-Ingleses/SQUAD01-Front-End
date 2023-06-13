import React from "react";
import "./Input.css";

const Input = ({ type, placeholder }) => {
  return (
    <input type={type} placeholder={placeholder} className="custom-input" />
  );
};

export default Input;

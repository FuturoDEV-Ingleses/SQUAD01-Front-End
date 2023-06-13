import React from "react";
import "./Button.css";

const Button = ({ children }) => {
  return <button className="custom-button">{children}</button>;
};

export default Button;

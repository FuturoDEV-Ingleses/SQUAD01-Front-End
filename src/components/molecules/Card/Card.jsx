import React from "react";
import "./Card.css";

export default function Card({ title, value, clickable, icon, ...props }) {
  return (
    <div className={`card ${clickable && "clickable"}`} {...props}>
      <h3>{title}</h3>
      {value && <p>{value}</p>}
      {icon && <img src={icon} alt="Edit" className="edit-icon" />}
    </div>
  );
}

import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  span,
  type = "text",
  placeholder= "",
  onclick
}) => (
  <li>
    <label htmlFor={name}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      onclick={onclick}
    />
    <span>{span}</span>
  </li>
);

export default Field;

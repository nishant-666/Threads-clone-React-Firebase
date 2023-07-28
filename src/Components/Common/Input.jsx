import React from "react";

export default function Input({
  placeholder = "",
  name = "",
  handleInput,
  value,
  type,
  className = "common-input",
}) {
  return (
    <div>
      <input
        className={className}
        placeholder={placeholder}
        name={name}
        onChange={handleInput}
        value={value}
        type={type}
      />
    </div>
  );
}

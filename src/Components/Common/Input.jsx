import React from "react";

export default function Input({
  placeholder = "",
  name = "",
  handleInput,
  value,
  type,
}) {
  return (
    <div>
      <input
        className="common-input"
        placeholder={placeholder}
        name={name}
        onChange={handleInput}
        value={value}
        type={type}
      />
    </div>
  );
}

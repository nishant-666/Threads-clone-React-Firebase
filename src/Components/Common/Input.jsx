import React from "react";

export default function Input({ placeholder = "", name = "" }) {
  return (
    <div>
      <input placeholder={placeholder} name={name} />
    </div>
  );
}

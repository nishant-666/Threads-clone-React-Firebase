import React, { useState } from "react";
import Input from "./Common/Input";
import { signUp } from "../API/Auth";
import IGLogo from "../assets/IGLogo.png";
import Toast from "./Common/Toast";

export default function SignUp() {
  const [inputs, setInputs] = useState({});
  function handleInput(event) {
    let { name, value } = event.target;
    let input = { [name]: value };
    setInputs((prev) => ({ ...prev, ...input }));
  }

  async function handlesignUp() {
    let response = await signUp(inputs.email, inputs.password);
    Toast("Sign Up Successful!", "success");
    setInputs({ name: "", email: "", password: "" });
  }

  return (
    <div className="login-container">
      <img className="Ig-logo" src={IGLogo} />
      <Input
        placeholder="Enter your Name"
        name="name"
        handleInput={handleInput}
        value={inputs.name}
        type="text"
      />

      <Input
        placeholder="Enter your Email"
        name="email"
        handleInput={handleInput}
        value={inputs.email}
        type="email"
      />

      <Input
        placeholder="Enter your Password"
        name="password"
        handleInput={handleInput}
        value={inputs.password}
        type="password"
      />

      <button className="login-btn" onClick={handlesignUp}>
        Sign Up
      </button>
    </div>
  );
}

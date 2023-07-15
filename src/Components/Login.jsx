import React, { useState } from "react";
import Input from "./Common/Input";
import IGLogo from "../assets/IGLogo.png";
import { signIn } from "../API/Auth";
import Toast from "./Common/Toast";

export default function Login() {
  const [inputs, setInputs] = useState({});
  function handleInput(event) {
    let { name, value } = event.target;
    let input = { [name]: value };
    setInputs((prev) => ({ ...prev, ...input }));
  }

  async function handlesignIn() {
    let response = await signIn(inputs.email, inputs.password);
    Toast("Log In Successful!", "success");
    setInputs({ email: "", password: "" });
  }

  return (
    <div className="login-container">
      <img className="Ig-logo" src={IGLogo} />
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
        type="password"
        handleInput={handleInput}
        value={inputs.password}
        type="password"
      />

      <button className="login-btn" onClick={handlesignIn}>
        Log In
      </button>
    </div>
  );
}

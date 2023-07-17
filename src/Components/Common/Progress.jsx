import React from "react";
import { Progress } from "antd";

const ProgressBar = ({ imageProgress }) => (
  <Progress percent={imageProgress} status="active" />
);
export default ProgressBar;

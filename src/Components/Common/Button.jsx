import React from "react";

import { Button, Tooltip } from "antd";
const CommonButton = ({ PlusOutlined, onClick }) => (
  <Tooltip title="plus">
    <Button onClick={onClick} shape="circle" icon={PlusOutlined} />
  </Tooltip>
);
export default CommonButton;

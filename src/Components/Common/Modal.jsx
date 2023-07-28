import React, { useState } from "react";
import { Modal } from "antd";

const ModalComponent = ({
  title,
  children,
  showCommentBox,
  setShowCommentBox,
}) => {
  const handleCancel = () => {
    setShowCommentBox(false);
  };

  // useEffect(() => {
  //   setIsModalOpen(showCommentBox);
  // }, [showCommentBox]);

  return (
    <>
      <Modal
        title={title}
        centered
        className="common-modal"
        open={showCommentBox}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};
export default ModalComponent;

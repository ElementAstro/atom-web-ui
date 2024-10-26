import React, { useState } from "react";
import Modal from "../components/Modal";

const ModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        header={<h2>Modal Header</h2>}
        footer={<button onClick={handleCloseModal}>Close</button>}
        size="medium"
        position="center"
        variant="primary"
        customClass="my-custom-modal"
        customHeaderClass="my-custom-header"
        customFooterClass="my-custom-footer"
        customContentClass="my-custom-content"
        theme="light"
        tooltip="Close Modal"
        borderWidth="2"
        icon={<span>✖️</span>}
        fullscreen={false}
        autoClose={false}
        autoCloseDuration={5000}
        iconColor="text-gray-400"
        onFocus={() => console.log("Modal focused")}
        onBlur={() => console.log("Modal blurred")}
        onKeyDown={(e) => console.log("Key down on modal", e)}
        onAnimationEnd={() => console.log("Animation ended")}
        onDoubleClick={() => console.log("Modal double-clicked")}
        ariaLabel="示例模态框"
      >
        <p>This is the content of the modal.</p>
      </Modal>
    </div>
  );
};

export default ModalExample;

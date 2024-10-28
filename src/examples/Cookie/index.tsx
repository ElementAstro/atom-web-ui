import React, { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CookieManager from "../../components/Cookie";

const CookieManagerExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        onClick={openModal}
        customClass="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Open Cookie Manager
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CookieManager />
      </Modal>
    </div>
  );
};

export default CookieManagerExample;

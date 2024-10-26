import React, { useState } from "react";
import DraggableModal from "../components/DraggableModal";

const DraggableModalExample: React.FC = () => {
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
        Open Draggable Modal
      </button>
      <DraggableModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        theme="light"
        header="Example Draggable Modal"
        tooltip="Close Modal"
        borderWidth="2"
        animation="transition-transform duration-300 ease-in-out"
        icon={<span>✖️</span>}
        fullscreen={false}
        resizable={true}
        autoClose={false}
        ariaLabel="示例可拖动模态框"
      >
        <p>This is the content of the draggable modal.</p>
      </DraggableModal>
    </div>
  );
};

export default DraggableModalExample;
import React, { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

const ConfirmDialogExample: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed");
    handleCloseDialog();
  };

  const handleCancel = () => {
    console.log("Cancelled");
    handleCloseDialog();
  };

  return (
    <div className="p-4">
      <button
        onClick={handleOpenDialog}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Confirm Dialog
      </button>
      <ConfirmDialog
        isOpen={isDialogOpen}
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmation"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonColor="bg-green-500"
        cancelButtonColor="bg-red-500"
        theme="light"
        tooltip="Confirm your action"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconPosition="top"
        autoClose={false}
        ariaLabel="确认对话框"
      />
    </div>
  );
};

export default ConfirmDialogExample;
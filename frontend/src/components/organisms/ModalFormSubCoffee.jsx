import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

export const ModalFormSubCoffee = ({ open, onClose, children }) => {
  return (
    <>
      <Modal isOpen={open} size="3xl" onClose={onClose} isDismissable={false} placement="top-center" className="bg-[#00684a] text-white">
        <ModalContent>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
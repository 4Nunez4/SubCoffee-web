import React from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";

export const ModalForm = ({ open, onClose, children, title }) => {
  return (
    <>
      <Modal isOpen={open} onClose={onClose} isDismissable={false} placement="top-center" className="bg-[#00684a] text-white">
        <ModalContent>
          <ModalHeader className="flex justify-center">
            <h1 className="text-center text-3xl font-bold">{title}</h1>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

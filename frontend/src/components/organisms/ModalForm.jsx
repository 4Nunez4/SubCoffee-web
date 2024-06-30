import React from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";

export const ModalForm = ({ open, onClose, children, title }) => {
  return (
    <>
      <Modal isOpen={open} onClose={onClose} isDismissable={false} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex justify-center">
            <h1 className="font-semibold text-3xl">{title}</h1>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

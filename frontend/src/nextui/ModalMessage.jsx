import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function ModalMessage({ label, isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center ">
        <ModalContent className="p-4">
          <ModalBody>
            <label> {label} </label>
          </ModalBody>
          <ModalFooter className="justify-center">
            <Button color="primary" onClick={onClose} className="inline-flex items-center justify-center py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md hover:bg-[#00684a] border-2 hover:border-[#00684a] hover:text-[#e0e0e0] transition-all ease-in-out duration-500">
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

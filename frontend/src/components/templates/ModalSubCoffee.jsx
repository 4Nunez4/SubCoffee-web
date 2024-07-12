import React from "react";
import ModalSubasta from "../../pages/ModalSubasta";
import { ModalFormSubCoffee } from "../organisms/ModalFormSubCoffee";

function ModalSubCoffee ({ open, onClose }) {
  return (
    <>
      <ModalFormSubCoffee open={open} onClose={onClose} >
        <ModalSubasta onClose={onClose} />
      </ModalFormSubCoffee>
    </>
  );
};

export default ModalSubCoffee
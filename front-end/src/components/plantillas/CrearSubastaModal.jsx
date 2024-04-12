import React from "react";
import { FaX } from "react-icons/fa6";
import FormCrearSubasta from "../moleculas/FormCrearSubasta"
import SubastaHome from "../moleculas/SubastaHome"
import { Modal } from "../organismos/Modal";

function ModalForm({open, onClose}){

    return(
        <>
            <Modal open={open} onClose={onClose}>
             <FaX />
                <FormCrearSubasta />
            </Modal>
        </>
    )
}
export default ModalForm
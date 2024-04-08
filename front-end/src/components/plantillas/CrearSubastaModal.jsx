import React from "react";
import { FaX } from "react-icons/fa6";
import FormCrearSubasta from "../moleculas/FormCrearSubasta"
import { Modal } from "../organismos/Modal";

function ModalForm({open, onClose, handleSubmit, actionLabel}){

    return(
        <>
            <Modal open={open} onClose={onClose}>
                <FormCrearSubasta handleSubmit={handleSubmit} actionLabel={actionLabel} />
                <FaX />
            </Modal>
        </>
    )
}
export default ModalForm

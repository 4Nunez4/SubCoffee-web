import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import FormVariedadUser from "../components/templates/FormVariedadUser";
import VariedadUserContext from "../context/VariedadUserContext";

export default function ModaVariedadUser({ isOpen, onClose, mode, fincaId }) {
    const user = JSON.parse(localStorage.getItem("user"));

    const { getVariForUser, variedadForuser } = useContext(VariedadUserContext);

    const [abrirModalVariedad, setAbrirModalVariedad] = useState(false);

    useEffect(() => {
        if (user.pk_cedula_user && fincaId) {
            getVariForUser(user.pk_cedula_user, fincaId);
        }
    }, [user.pk_cedula_user, fincaId, getVariForUser]);

    const handleToggleVariedad = (mode) => {
        setAbrirModalVariedad(true);
        setMode(mode);
    };

    return (
        <>
            <FormVariedadUser
                open={abrirModalVariedad}
                onClose={() => setAbrirModalVariedad(false)}
                title={mode === "create" ? "Registrar Variedad" : "Actualizar Variedad"}
                titleBtn={mode === "create" ? "Registrar" : "Actualizar"}
                mode={mode}
            />
            <Modal
                size="xl"
                isOpen={isOpen}
                onClose={onClose}
                isDismissable={false}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-center">Variedades</ModalHeader>
                        <ModalBody>
                            <p></p>
                        </ModalBody>
                        <ModalFooter className="flex justify-center items-center">
                            <Button
                                color="default"
                                className="w-auto"
                                onClick={() => handleToggleVariedad("create")}
                            >
                                Registrar variedad
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}

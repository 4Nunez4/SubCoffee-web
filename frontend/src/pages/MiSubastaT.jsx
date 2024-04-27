import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import VariedadT from "./VariedadT";
import FincaT from "./FincaT";

export default function MiSubastaT() {
  const { isOpen: isOpenFinca, onOpen: onOpenFinca, onClose: onCloseFinca } = useDisclosure();
  
  return (
    <div className="w-full flex bg-gray-100 flex-col items-center px-10">
      <div className="pb-2">
        <div className="flex justify-center pt-8 pb-2">
          <img src="./cafe.png" alt="Cafe_imagen" className="rounded-s-2xl transition-width duration-300 md:max-w-[25%] lg:max-w-[33.33%] xl:max-w-[50%] w-full lg:w-auto xl:w-auto" />
          <img src="./carrofinca.png" alt="Finca_imagen" className="rounded-e-2xl transition-width duration-300 md:max-w-[25%] lg:max-w-[33.33%] xl:max-w-[50%] w-full lg:w-auto xl:w-auto" />
        </div>
        <p className="text-center mt-3 text-negro transition duration-300">
          ¡Tu finca tiene una historia que contar!
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <FincaT />
      <p className="text-center"> Registra todas las maravillosas variedades de café que tienes en tu finca</p>
        <VariedadT />
      </div>
      <div className="mb-6">
        <Button onClick={onOpenFinca}>Registrar Subasta</Button>
      </div>

      <Modal isOpen={isOpenFinca} onClose={onCloseFinca} className="p-4">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            Modal Title 1
          </ModalHeader>
          <ModalBody>
            <p>Contenido del primer modal...</p>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button color="primary" onClick={onCloseFinca}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

import React, { useState } from "react";
import AvatarAtom from "../atoms/AvatarAtom";
import FooterLinkAtom from "../atoms/FooterLinkAtom";
import { icono } from "../atoms/IconsAtom";
import TextSubAtom from "../atoms/TextSubAtom";
import FooterSectionMolecule from "../molecules/FooterSectionMolecule";
import ButtonAtomFull from "../atoms/ButtonAtomFull";
import toast from "react-hot-toast";
import InputDudaWithIconAtom from "../atoms/InputDudaWithIconAtom";

const FooterOrganism = () => {
  const [texto, setTexto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Gracias por tu mensaje!");
    setTexto("");
  };

  return (
    <footer className="py-8 pt-12 sm:pb-4 bg-slate-300">
      <div className="mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <div className="flex items-center">
              <AvatarAtom img="isotipo-SubCoffee.png" alt="Logo" />
              <div className="ml-2">
                <TextSubAtom to="/" color="text-gray-400" text="Sub" />
                <TextSubAtom to="/" color="text-gray-700" text="Coffee" />
              </div>
            </div>
            <p className="text-sm lg:text-base text-gray-700 mt-2">
              Una plataforma innovadora diseñada para conectar a caficultores,
              compradores y comerciantes en un entorno de subastas eficiente y
              transparente.
            </p>
          </div>

          <div className="sm:col-span-1 md:col-span-1 lg:col-span-2">
            <FooterSectionMolecule title="Información">
              <FooterLinkAtom to="/somos">¿Quiénes somos?</FooterLinkAtom>
              <FooterLinkAtom to="/politicas">Políticas y privacidad</FooterLinkAtom>
              <FooterLinkAtom to="/ayuda">¿Cómo funciona?</FooterLinkAtom>
            </FooterSectionMolecule>
          </div>

          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-2">
              ¿Tienes alguna duda?
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <InputDudaWithIconAtom
                icon={icono.iconoGmail}
                id="text"
                name="text"
                placeholder="Duda o sugerencia..."
                required
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
              <ButtonAtomFull text="white" color="gray-400" colorHover="gray-500">
                Enviar Duda
              </ButtonAtomFull>
            </form>
          </div>
        </div>

      </div>
        <div className="flex items-center justify-center py-3">
          <div className="grow border-b border-gray-500"></div>
          <span className="font-semibold text-lg text-gray-500">
            Subcoffee
          </span>
          <div className="grow border-b border-gray-500"></div>
        </div>
        <p className="text-center text-sm font-medium text-gray-600 pb-3">
          © Subcoffee, todos los derechos reservados
        </p>
    </footer>
  );
};

export default FooterOrganism;

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
    <footer className="py-8 pt-12 sm:pb-4 bg-blancoMedio1">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <div className="flex items-center">
              <AvatarAtom img="isotipo-SubCoffee.png" alt="Logo" />
              <div className="ml-2">
                <TextSubAtom to="/" color="cafeClaroLogo" text="Sub" />
                <TextSubAtom to="/" color="cafeOscuroLogo" text="Coffee" />
              </div>
            </div>
            <p className="text-sm lg:text-base text-grisOscuro mt-2">
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
            <p className="text-sm font-semibold text-gray-400 uppercase mb-2">
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
              <ButtonAtomFull color="verdeSena1" colorHover="verdeSena2">
                Enviar Duda
              </ButtonAtomFull>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-center py-3">
          <div className="grow border-b border-grisMedio2"></div>
          <span className="px-2 font-semibold text-lg text-grisMedio2">
            Subcoffee
          </span>
          <div className="grow border-b border-grisMedio2"></div>
        </div>
        <p className="text-center text-sm font-medium text-grisMedio2 pb-3">
          © Subcoffee, todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default FooterOrganism;

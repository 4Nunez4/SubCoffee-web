import React from "react";
import { Button } from "@nextui-org/react";

import FooterLinkAtom from "../atoms/FooterLinkAtom";
import { Link } from "react-router-dom";
import GmailIcon from "../../nextui/GmailIcon";
import YoutubeIcon from "../../nextui/YoutubeIcon";

const FooterOrganism = () => {
  return (
    <footer className="py-8 pt-12 sm:pb-4 bg-[#00684a]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <div className="flex items-center gap-x-1">
              <Link to="/" className="cursor-pointer"><img src="./src/assets/isotipo-SubCoffee.png" alt="Logo SubCoffee" className="w-9"/></Link>
              <Link to="/" className="text-gray-100 text-2xl cursor-pointer font-medium" >SubCoffee</Link>
            </div>
            <p className="text-sm lg:text-base text-gray-100 mt-2">
              Una plataforma innovadora diseñada para conectar a caficultores,
              compradores y comerciantes en un entorno de subastas eficiente y
              transparente.
            </p>
          </div>

          <div className="sm:col-span-1 md:col-span-1 lg:col-span-2">
            <div className="flex flex-col items-center justify-center ml-8 md:ml-0">
              <p className="text-lg font-semibold mb-4 text-gray-100" >Información</p>
              <FooterLinkAtom to="/somos"> ¿Quiénes somos? </FooterLinkAtom>
              <FooterLinkAtom to="/privacy-policy"> Políticas y privacidad </FooterLinkAtom>
              <FooterLinkAtom to="/ayuda">¿Cómo funciona?</FooterLinkAtom>
            </div>
          </div>

          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
            <div className="flex flex-col items-center justify-center ">
              <p className="text-lg font-semibold mb-4 text-gray-100">Visitanos</p>
              <div className="flex gap-2">
                <Button
                  href="mailto:info@subcoffee.com"
                  as={Link}
                  className="bg-[#ffffff]"
                  startContent={<GmailIcon />}
                ></Button>
                <Button
                  href="https://www.youtube.com/channel/your-channel"
                  as={Link}
                  className="bg-[#ffffff]"
                  startContent={<YoutubeIcon />}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-3">
        <div className="grow border-b border-gray-100"></div>
        <span className="px-2 font-semibold text-lg text-gray-100">
          Subcoffee
        </span>
        <div className="grow border-b border-gray-100"></div>
      </div>
      <p className="text-center text-sm font-medium text-gray-100 pb-3">
        © Subcoffee, todos los derechos reservados
      </p>
    </footer>
  );
};

export default FooterOrganism;

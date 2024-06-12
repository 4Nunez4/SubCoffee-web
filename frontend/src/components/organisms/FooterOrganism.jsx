import React from "react";

import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";

import FooterLinkAtom from "../atoms/FooterLinkAtom";
import { Link } from "react-router-dom";

const FooterOrganism = () => {
  return (
    <footer id="contacto" className=" px-20 py-10 bg-[#4A9F1F] ">
      <div className="">
        <div className="grid grid-cols-3">
          {/* ///---------------------------------------------------------------------------/// */}
          <div className="grid grid-rows-4 h-60 text-center font-normal text-base text-[#919190] ">
            <p className=" font-medium text-lg text-[#FDFBF6]">Información</p>
            <FooterLinkAtom to="/somos"> ¿Quiénes somos? </FooterLinkAtom>
            <FooterLinkAtom to="/privacy-policy">
              {" "}
              Políticas y privacidad{" "}
            </FooterLinkAtom>
            <FooterLinkAtom to="/ayuda">¿Cómo funciona?</FooterLinkAtom>
          </div>
          {/* ///---------------------------------------------------------------------------/// */}
          <div className="grid grid-rows-2 h-60  font-normal text-xs text-[#919190]">
            <div>
              <p className=" text-base text-[#FDFBF6] text-center">
                Una plataforma innovadora diseñada para conectar a caficultores,
                compradores y comerciantes en un entorno de subastas eficiente y
                transparente.
              </p>
            </div>
            <div>
              <Link to="/" className="cursor-pointer flex justify-center ">
                <img
                  src="./src/assets/isotipo-SubCoffee.png"
                  alt="Logo SubCoffee"
                  className=" h-16 w-16 mr-2 rounded-full"
                />
              </Link>
            </div>
          </div>

          {/* ///---------------------------------------------------------------------------/// */}
          <div className="grid grid-rows-2 h-60  font-normal text-x1 text-[#919190]">
            <p className=" font-medium text-lg text-[#FDFBF6] text-center ">
              Redes
            </p>
            <div className="grid grid-cols-3 gap-4 text-[#FDFBF6] text-3xl  ">
              <div className="flex flex-col items-center justify-center ">
                <FaFacebookSquare />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <RiInstagramFill />
              </div>
              <div className="flex flex-col items-center justify-center ">
                {" "}
                <FaLinkedin />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <RiWhatsappFill />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <FaYoutube />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <FaTiktok />
              </div>
            </div>
          </div>

          {/* ///---------------------------------------------------------------------------/// */}
        </div>
      </div>
      <div className="flex items-center justify-center py-3">
        <div className="grow border-b border-gray-100"></div>
        <span className="px-2 font-semibold text-lg text-[#FDFBF6]">
          SubCoffee
        </span>
        <div className="grow border-b border-gray-100"></div>
      </div>
      <p className="text-center text-sm font-medium text-[#FDFBF6] pb-3">
        © SubCoffee, todos los derechos reservados
      </p>
    </footer>
  );
};

export default FooterOrganism;

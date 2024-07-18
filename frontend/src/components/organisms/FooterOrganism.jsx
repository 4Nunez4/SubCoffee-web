import React from "react";

import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

import FooterLinkAtom from "../atoms/FooterLinkAtom";
import { Link } from "react-router-dom";

const FooterOrganism = () => {
  return (
    <footer id="contacto" className="py-7 bg-[#4A9F1F] ">
      <div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col justify-center h-60 gap-y-5 text-center font-normal text-base text-[#919190]">
            <p className=" font-medium text-lg text-[#FDFBF6]">Información</p>
            <div className="flex flex-col gap-y-2">
              <FooterLinkAtom to="/somos"> ¿Quiénes somos? </FooterLinkAtom>
              <FooterLinkAtom to="/privacy-policy"> Políticas y privacidad </FooterLinkAtom>
              <FooterLinkAtom to="/ayuda"> ¿Cómo funciona?</FooterLinkAtom>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center items-center h-60 font-normal text-xs text-[#919190]">
            <Link to="/" className="cursor-pointer flex justify-center mb-3">
              <img
                src="./src/assets/isotipo-SubCoffee.png"
                alt="Logo SubCoffee"
                className=" h-16 w-16 mr-2 rounded-full"
              />
            </Link>
            <div className="gap-y-4 flex flex-col">
              <p className=" text-base text-[#FDFBF6] text-center">
                SubCoffee: Una plataforma innovadora diseñada para conectar a caficultores,
                compradores y comerciantes en un entorno de subastas eficiente y
                transparente, contactanos si encuentas algun defecto.
              </p>
              <p className="font-medium text-[#FDFBF6]">subcoffee1s@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col justify-center h-60 font-normal text-x1 text-[#919190]">
            <p className="font-medium text-lg text-[#FDFBF6] text-center">Redes</p>
            <div className="grid grid-cols-3 gap-y-9 text-[#FDFBF6] text-3xl mt-5 px-8">
              <div className="flex flex-col items-center justify-center ">
                <a href="https://www.facebook.com/profile.php?id=61561697909286" target="_blank" rel="noopener noreferrer">
                <FaFacebookSquare />
                </a>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <a href="https://www.instagram.com/subcoffee1s?igsh=MXI0aTc5cXFsOWU0Mw==" target="_blank" rel="noopener noreferrer" >
                  <RiInstagramFill />
                </a>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <a href="https://www.linkedin.com/in/subcoffee-sena-3660b1317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" >
                  <FaLinkedin />
                </a>
              </div>
              <div className="flex flex-col items-center justify-center ">      
                <SiGmail />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <a href="https://youtube.com/@subcoffee-k3f?si=K8iQRmlS-bTEWB4k " target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <a href="https://www.tiktok.com/@subcoffee1?_t=8nc0mwsl15Z&_r=1 " target="_blank" rel="noopener noreferrer">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-3">
        <div className="grow border-b border-gray-100"></div>
        <span className="px-2 font-semibold text-lg text-[#FDFBF6]"> SubCoffee </span>
        <div className="grow border-b border-gray-100"></div>
      </div>
      <p className="text-center text-sm font-medium text-[#FDFBF6]"> ©SubCoffee, todos los derechos reservados </p>
    </footer>
  );
};

export default FooterOrganism;

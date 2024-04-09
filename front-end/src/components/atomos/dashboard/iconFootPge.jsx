import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function SocialIcons() {
    const iconStyle = {
        fontSize: '24px', // Tamaño del icono
        margin: '0 10px', // Espacio entre los iconos
        color: '#ffffff', // Color de los iconos
        cursor: 'pointer', // Cambia el cursor al pasar por encima del icono
    };

    return (
        <div className="text-center">
            <h3 className="text-lg font-bold mb-4">Redes Sociales</h3>
            <div className="flex justify-center items-center">
                <FaFacebookF style={iconStyle} />
                <FaLinkedin style={iconStyle} />
                <FaInstagram style={iconStyle} />
                <FaGithub style={iconStyle} />
                <FaWhatsapp style={iconStyle} />
            </div>
        </div>
    );
}

export default SocialIcons;
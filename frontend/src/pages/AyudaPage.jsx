import React, { useRef, useState, useEffect } from "react";
import { Button, ButtonGroup, Input } from "@nextui-org/react";

import ComoCrearSubasta from "./ComoCrearUnaSubasta";
import InfoRolesA from "./InfoRolesA";
import FlechaArriba from "../nextui/FlechaArriba";
import ComoPujarUnaSubasta from "./ComoPujarUnaSubasta";
import { icono } from "../components/atoms/IconsAtom";
import { useAuthContext } from "../context/AuthContext";

function AyudaPage() {
  const comoCrearRef = useRef(null);
  const comoPujarRef = useRef(null);
  const infoRolesRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [texto, setTexto] = useState("");
  
  const { getUsers } = useAuthContext()
  useEffect(() => {
      getUsers()
    }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Gracias por tu mensaje!");
    setTexto("");
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (section) => {
    let ref;
    switch (section) {
      case "comoCrear":
        ref = comoCrearRef;
        break;
      case "comoPujar":
        ref = comoPujarRef;
        break;
      case "infoRoles":
        ref = infoRolesRef;
        break;
      default:
        return;
    }
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`p-8 px-44 mx-auto flex flex-col justify-center ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="flex justify-center w-auto items-center">
        <ButtonGroup>
          <Button
            onClick={() => scrollToSection("comoCrear")}
            className={`transition-opacity bg-[#e0e0e0] ${isScrolled ? "opacity-40" : ""}`}
          >
            Como crear una subasta
          </Button>
          <Button
            onClick={() => scrollToSection("comoPujar")}
            className={`transition-opacity bg-[#e0e0e0] ${isScrolled ? "opacity-40" : ""}`}
          >
            Como pujar una subasta
          </Button>
          <Button
            onClick={() => scrollToSection("infoRoles")}
            className={`transition-opacity bg-[#e0e0e0] ${isScrolled ? "opacity-40" : ""}`}
          >
            Información de Roles
          </Button>
        </ButtonGroup>
        <Button
          onClick={scrollToTop}
          startContent={<FlechaArriba />}
          className={`transition-opacity fixed bottom-8 right-8 ${
            isScrolled ? "opacity-40" : ""
          }`}
        >
          Ir Arriba
        </Button>
      </div>
      <div>
        <div ref={comoCrearRef} data-section="comoCrear">
          <ComoCrearSubasta />
        </div>
        <div ref={comoPujarRef} data-section="comoPujar">
          <ComoPujarUnaSubasta />
        </div>
        <div ref={infoRolesRef} data-section="infoRoles">
          <InfoRolesA />
        </div>
        {user ? (
          <div>
            <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
              <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
                ¿Tienes alguna duda?
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <Input
                  startContent={<icono.iconoGmail />}
                  name="text"
                  variant="bordered"
                  label=""
                  aria-label="Duda o sugerencia..."
                  placeholder="Duda o sugerencia..."
                  required={true}
                  type="text"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                />
                <Button className="bg-gray-400 text-white hover:bg-gray-500 w-full rounded-lg">
                  Enviar duda
                </Button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AyudaPage;

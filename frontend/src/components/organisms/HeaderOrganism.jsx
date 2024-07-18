import React, { useEffect, useState, useCallback } from "react";
import {
  User,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  AutocompleteSection,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthContext";
import AvatarAtom from "../atoms/AvatarAtom";
import { SearchIcon } from "../../nextui/SearchIcon";
import FormLogin from "../templates/FormLogin";
import { useSubastaContext } from "../../context/SubastaContext";

const USER_IMAGE_URL = "http://localhost:4000/usuarios/";
const SUBASTA_IMAGE_URL = "http://localhost:4000/subastas/";
const DEFAULT_USER_IMAGE = `${USER_IMAGE_URL}imagen_de_usuario.webp`;

const UserDropdown = ({ localUser, handleLogout, navigate }) => (
  <Dropdown placement="bottom-end" className="bg-[#e0e0e0]">
    <DropdownTrigger>
      <User
        as="button"
        avatarProps={{
          src: localUser.imagen_user
            ? `${USER_IMAGE_URL}${localUser.imagen_user}`
            : DEFAULT_USER_IMAGE,
        }}
        className="transition-transform text-gray-200"
        description={localUser.rol_user}
        name={localUser.nombre_user}
      />
    </DropdownTrigger>
    <DropdownMenu aria-label="User Actions" variant="flat">
      <DropdownItem
        key="profile"
        onClick={() => navigate(`/profile/${localUser.pk_cedula_user}`)}
        className="text-center text-[#39A800] hover:bg-[#39A800] hover:text-white"
        color="bg-[#00684a]"
      >
        Perfil
      </DropdownItem>
      <DropdownItem
        key="logout"
        onPress={handleLogout}
        className="text-center text-red-600 hover:bg-[#da3939] hover:text-white"
        color="bg-[#da3939]"
      >
        Cerrar sesión
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const NavLinks = () => (
  <div className="flex space-x-12 text-[#323232]">
    {["inicio", "quienessomos", "quequeremos", "beneficios", "contacto"].map(
      (section) => (
        <Link to="/" key={section}>
          <a href={`#${section}`} className="hover:text-[#39A800]">
            {section.charAt(0).toUpperCase() + section.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}
          </a>
        </Link>
      )
    )}
  </div>
);

function HeaderOrganism() {
  const [isMoonSelected, setIsMoonSelected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const { getUsers, logout, users } = useAuthContext();
  const { getSubsMenoCerradas, subastasActivas } = useSubastaContext();

  const handleLogout = useCallback(() => {
    Swal.fire({
      text: "¿Estás seguro de cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire({
          text: "Cierre de sesión éxitoso",
          icon: "success",
        });
      }
    });
  }, [logout, navigate]);

  const toggleTheme = useCallback(() => {
    setIsMoonSelected((prevValue) => !prevValue);
  }, []);

  useEffect(() => {
    if (localUser) {
      getUsers();
      getSubsMenoCerradas();
    }
  }, [localUser, getUsers, getSubsMenoCerradas]);

  return (
    <>
      {localUser ? (
        <nav className="grid grid-cols-6 gap-5 bg-[#4A9F1F] p-4 shadow-sm">
          <div className="col-span-4 flex justify-center item-center">
            {(localUser.rol_user === "comprador" ||
              localUser.rol_user === "vendedor") && (
              <Autocomplete
                classNames={{
                  base: "w-full max-w-md",
                  listboxWrapper: "max-h-[280px]",
                  selectorButton: "text-default-500",
                }}
                inputProps={{
                  classNames: {
                    input: "ml-1",
                    inputWrapper: "h-[48px]",
                  },
                }}
                listboxProps={{
                  hideSelectedIcon: true,
                  itemClasses: {
                    base: [
                      "w-11/12",
                      "col-span-4",
                      "rounded-lg",
                      "text-default-500",
                      "transition-opacity",
                      "data-[hover=true]:text-foreground",
                      "dark:data-[hover=true]:bg-default-50",
                      "data-[pressed=true]:opacity-70",
                      "data-[hover=true]:bg-default-200",
                      "data-[selectable=true]:focus:bg-default-100",
                      "data-[focus-visible=true]:ring-default-500",
                    ],
                  },
                }}
                aria-label="Select an employee"
                placeholder="Busca usuarios o subastas..."
                popoverProps={{
                  offset: 10,
                  classNames: {
                    base: "rounded-lg w-11/12 col-span-4 mx-auto",
                    content: "p-1 border-small border-default-100 bg-background",
                  },
                }}
                startContent={
                  <SearchIcon
                    className="text-default-400"
                    strokeWidth={2.5}
                    size={20}
                  />
                }
                radius="full"
                variant="faded"
              >
                <AutocompleteSection title="Usuarios">
                  {users.map((user) => (
                    <AutocompleteItem
                      key={user.pk_cedula_user}
                      textValue={user.nombre_user}
                    >
                      <Link to={`/profile/${user.pk_cedula_user}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2 items-center">
                            <User
                              as="button"
                              avatarProps={{
                                src: user.imagen_user
                                  ? `${USER_IMAGE_URL}${user.imagen_user}`
                                  : DEFAULT_USER_IMAGE,
                              }}
                              className="transition-transform text-gray-200"
                            />
                            <div className="flex flex-col">
                              <span className="text-small">
                                {user.nombre_user}
                              </span>
                              <span className="text-tiny text-default-400">
                                {user.email_user}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </AutocompleteItem>
                  ))}
                </AutocompleteSection>
                <AutocompleteSection title="Subastas">
                  {subastasActivas.length > 0 ? (
                    subastasActivas.map((subasta) => (
                      <AutocompleteItem
                        key={subasta.pk_id_sub}
                        textValue={subasta.nombre_tipo_vari}
                      >
                        <Link to={`/subasta/${subasta.pk_id_sub}`}>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <Avatar
                                alt={subasta.nombre_tipo_vari}
                                className="flex-shrink-0"
                                size="sm"
                                src={`${SUBASTA_IMAGE_URL}${subasta.imagen_sub}`}
                              />
                              <div className="flex items-center flex-col">
                                <span className="text-small">
                                  {subasta.pk_id_sub}-
                                  {subasta.nombre_tipo_vari}
                                </span>
                                <span className="text-tiny text-default-400">
                                  {subasta.nombre_user}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </AutocompleteItem>
                    ))
                  ) : (
                    <AutocompleteItem textValue="">
                      No hay subastas activas
                    </AutocompleteItem>
                  )}
                </AutocompleteSection>
              </Autocomplete>
            )}
          </div>
          <div className="flex justify-end col-span-2">
            <div className="flex items-center gap-4">
              <UserDropdown
                localUser={localUser}
                handleLogout={handleLogout}
                navigate={navigate}
              />
            </div>
          </div>
        </nav>
      ) : (
        <>
          <nav className="flex justify-between items-center fixed w-full h-24 m-0 top-0 p-4 shadow-sm z-20 bg-[#FDFBF6] px-20">
            <div className="flex items-center">
              <AvatarAtom img="isotipo-SubCoffee.png" />
              <Link to="/" className="text-[#39A800] text-2xl font-bold">
                SubCoffee
              </Link>
            </div>
            <div className="flex items-center gap-x-3 font-medium text-base">
              <div className="flex justify-between items-center p-6 ">
                <div className="flex space-x-12 text-[#323232]">
                  <a href="#inicio" className=" hover:text-[#39A800]"> Inicio </a>
                  <a href="#quienessomos" className=" hover:text-[#39A800]"> Quienes Somos </a>
                  <a href="#quequeremos" className=" hover:text-[#39A800]"> Que Queremos </a>
                  <a href="#beneficios" className=" hover:text-[#39A800]"> Beneficios </a>
                  <a href="#contacto" className=" hover:text-[#39A800]"> Contacto </a>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="text-white bg-[#39A800] h-10 w-32 rounded-lg"
              >
                Iniciar sesión
              </button>
            </div>
          </nav>
          <FormLogin
            className="bg-[#00684a] text-white"
            open={modalOpen}
            title="Iniciar sesión"
            onClose={() => setModalOpen(false)}
          />
        </>
      )}
    </>
  );
}

export default HeaderOrganism;

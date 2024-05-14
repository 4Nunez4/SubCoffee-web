import React, { useContext, useEffect, useState } from "react";
import {
  User,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { icono } from "../atoms/IconsAtom";
import AvatarAtom from "../atoms/AvatarAtom";
import ModalMessaAndNoti from "../molecules/ModalMessaAndNoti";
import { SearchIcon } from "../../nextui/SearchIcon";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import axiosClient from "../../api/axios";
import FormLogin from "../templates/FormLogin";

function HeaderOrganism() {
  const [abrirBell, setAbrirBell] = useState(false);
  const [isMoonSelected, setIsMoonSelected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userslist, setUserslist] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = window.localStorage.getItem("token");
  const users = JSON.parse(localStorage.getItem("user"));
  const { setUsers } = useContext(AuthContext);
  const URL = "http://localhost:4000/auth/login";

  const login = async (data, e) => {
    e.preventDefault();
    await axios
      .post(URL, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, { duration: 5000 });
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/subcoffee");
        } else if (res.status === 401) {
          toast.error("Usuario no registrado");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = async (value) => {
    setSearchValue("");
  };

  const handleLogout = () => {
    Swal.fire({
      text: "¿Estás seguro de cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/");
        toast.success("Cierre de sesión exitoso");
      }
    });
  };

  const toggleAbrirBell = () => {
    setAbrirBell(!abrirBell);
  };

  const toggleTheme = () => {
    setIsMoonSelected((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (users) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axiosClient.get("/v1/users");
      setUserslist(response.data.data);
    } catch (error) {
      toast.error("Error al listar a los usuarios" + error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <nav className="flex justify-between items-center bg-gray-300 p-4 shadow-sm">
          <div className="flex flex-col">
            <Link to="/" className="text-gray-500 text-2xl font-semibold">
              Bienvenido
            </Link>
          </div>
          <div>
            <Autocomplete
              classNames={{
                base: "w-96",
                listboxWrapper: "max-h-[320px]",
                selectorButton: "text-default-500",
              }}
              value={searchValue} // Asigna el estado local al valor del input
              onChange={(value) => handleSearch(value)} // Función para manejar cambios en el input
              defaultItems={userslist}
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
                    "rounded-medium",
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
              placeholder="Buscar usuario, subasta..."
              popoverProps={{
                offset: 10,
                classNames: {
                  base: "rounded-large",
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
              variant="bordered"
            >
              {(user) => (
                <AutocompleteItem
                  key={user.pk_cedula_user}
                  textValue={user.nombre_user}
                >
                  <Link to={`/profile/${user.pk_cedula_user}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Avatar
                          alt={user.nombre_user}
                          className="flex-shrink-0"
                          size="sm"
                          src={
                            user.imagen_user && user.imagen_user.length > 0
                              ? `http://localhost:4000/img/${user.imagen_user}`
                              : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
                          }
                        />
                        <div className="flex flex-col">
                          <span className="text-small">{user.nombre_user}</span>
                          <span className="text-tiny text-default-400">
                            {user.email_user}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className="flex gap-x-3 items-center">
            {isMoonSelected ? (
              <icono.iconoLuna
                onClick={toggleTheme}
                className="text-blanco cursor-pointer"
              />
            ) : (
              <icono.iconoSol
                onClick={toggleTheme}
                className="text-blanco cursor-pointer"
              />
            )}
            <div className="flex items-center gap-4">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      src: `${
                        users.imagen_user && users.imagen_user.length > 0
                        ? `http://localhost:4000/img/${users.imagen_user}`
                        : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
                      }`,
                    }}
                    className="transition-transform"
                    description={`${users.rol_user}`}
                    name={`${users.nombre_user}`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    onClick={() => navigate(`/profile/${users.pk_cedula_user}`)}
                    className="text-center bg-gray-400 hover:bg-gray-200 border text-white py-2"
                  >
                    Perfil
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    onPress={handleLogout}
                    className="text-center bg-red-600 border text-white py-2"
                  >
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {abrirBell && (
            <div className="absolute top-16 right-32 flex justify-center items-center">
              <div className="bg-blanco rounded-xl w-80">
                <ModalMessaAndNoti onClose={toggleAbrirBell} />
              </div>
            </div>
          )}
        </nav>
      ) : (
        <>
          <nav className="flex justify-between items-center bg-gray-300 fixed w-full m-0 top-0 p-4 shadow-sm z-20">
            <div className="flex items-center">
              <AvatarAtom img="isotipo-SubCoffee.png" />
              <Link to="/" className="text-gray-500 text-2xl font-semibold">
                SubCoffee
              </Link>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="cursor-pointer">
                {isMoonSelected ? (
                  <icono.iconoLuna
                    onClick={toggleTheme}
                    className="text-blanco"
                  />
                ) : (
                  <icono.iconoSol
                    onClick={toggleTheme}
                    className="text-blanco"
                  />
                )}
              </div>
              <Button onClick={() => setModalOpen(true)} className="border border-gray-400 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-400 duration-500 transition-all ease-in-out hover:text-gray-200">
                Iniciar sesión
              </Button>
            </div>
          </nav>
          <FormLogin
            open={modalOpen}
            title="Iniciar sesión"
            onClose={() => setModalOpen(false)}
            handleSubmit={login}
          />
        </>
      )}
    </>
  );
}

export default HeaderOrganism;

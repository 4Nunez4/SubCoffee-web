  import React, { useEffect, useState } from "react";
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
  import Swal from "sweetalert2";

  import { useAuthContext } from "../../context/AuthContext";

  import { icono } from "../atoms/IconsAtom";
  import AvatarAtom from "../atoms/AvatarAtom";
  import { SearchIcon } from "../../nextui/SearchIcon";
  import FormLogin from "../templates/FormLogin";

  function HeaderOrganism() {
    const [isMoonSelected, setIsMoonSelected] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const localUser = JSON.parse(localStorage.getItem("user"));

    const { getUsers, logout, users } = useAuthContext();

    const handleLogout = () => {
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
    };

    const toggleTheme = () => {
      setIsMoonSelected((prevValue) => !prevValue);
    };

    useEffect(() => {
      if (localUser) {
        getUsers();
      }
    }, []);

    return (
      <>
        {localUser ? (
          <nav className="flex justify-between items-center bg-[#00684a] p-4 shadow-sm">
            <div className="flex flex-col">
              <Link to={`${localUser.rol_user !== "admin" ? "/": "/users"}`} className="text-gray-200 text-2xl font-semibold">
                Bienvenido
              </Link>
            </div>
            <Autocomplete
              classNames={{
                base: "w-80",
                listboxWrapper: "max-h-[280px]",
                selectorButton: "text-default-500",
              }}
              defaultItems={users}
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
              placeholder="Buscar usuarios, subastas..."
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
              variant="faded"
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
                            ? `http://localhost:4000/usuarios/${user.imagen_user}`
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
            <div className="flex gap-x-3 items-center">
              {isMoonSelected ? (
                <icono.iconoLuna
                  onClick={toggleTheme}
                  className="text-white cursor-pointer"
                />
              ) : (
                <icono.iconoSol
                  onClick={toggleTheme}
                  className="text-white cursor-pointer"
                />
              )}
              <div className="flex items-center gap-4">
                <Dropdown placement="bottom-end" className="bg-[#e0e0e0]">
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        src: `${
                          localUser.imagen_user && localUser.imagen_user.length > 0
                            ? `http://localhost:4000/usuarios/${localUser.imagen_user}`
                            : "http://localhost:4000/usuarios/imagen_de_usuario.webp"
                        }`,
                      }}
                      className="transition-transform text-gray-200"
                      description={`${localUser.rol_user}`}
                      name={`${localUser.nombre_user}`}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem
                      key="profile"
                      onClick={() =>
                        navigate(`/profile/${localUser.pk_cedula_user}`)
                      }
                      className="text-center text-[#001e2b] hover:bg-[#00684a] hover:text-white"
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
              </div>
            </div>
          </nav>
        ) : (
          <>
            <nav className="flex justify-between items-center bg-[#00684a] fixed w-full  h-20 m-0 top-0 p-4 shadow-sm z-20">
              <div className="flex items-center">
                <AvatarAtom img="isotipo-SubCoffee.png" />
                <Link to="/" className="text-gray-200 text-2xl font-bold">
                  SubCoffee
                </Link>
              </div>
              <div className="flex items-center gap-x-3">
                <Button
                  onClick={() => setModalOpen(true)}
                  className="py-2 px-4 bg-[#001e2b] text-white font-semibold rounded-md"
                >
                  Iniciar sesión
                </Button>
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

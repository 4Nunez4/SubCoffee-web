import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { FaRegCircleUser } from "react-icons/fa6";
import { RxLockClosed } from "react-icons/rx";
import { IoCalendarOutline } from "react-icons/io5";

function DashboardContentOrganims() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      navigate("/subcoffee");
    }
  }, [navigate]);

  return (
    <>
      <div>
        {/* ///---------------------------------------------------------------------------/// */}
        <div>
          <section
            id="inicio"
            className="min-h-screen bg-[url('./src/assets/ImagenesIndex/img-1.jpg')] bg-no-repeat bg-cover grid"
          >
            <div className=" flex flex-col items-center justify-center">
              <div className="bg-[#82828286] h-1/3 w-3/5 rounded-lg flex justify-center items-center text-lg font-medium">
                <div className=" w-3/4 h-auto ">
                  <div className="text-center text-[#FDFBF6] ">
                    <h1 className="text-5xl font-bold mb-4">
                      Bienvenido a Sub
                      <span className="text-[#39A800]">Coffee</span>
                    </h1>
                    <p className=" py-4">
                      Una plataforma online donde te podrás conectar con
                      diferentes usuarios para subastar y pujar por café de alta
                      calidad. Solicita tu registro a esta gran familia ya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ///---------------------------------------------------------------------------/// */}

        <div class="  bg-[#FDFBF6]">
          <section
            id="quienessomos"
            class="relative h-screen  flex flex-col items-center justify-center "
          >
            <div class="grid grid-cols-2 place-items-center px-20">
              <div class="flex flex-col items-center justify-center">
                <div class="grid grid-rows-3 gap-2">
                  <div className="flex justify-center items-center">
                    <h2 class="font-semibold text-3xl">Quienes Somos?</h2>
                  </div>
                  <div>
                    <p class="font-normal text-lg text-[#919190] text-center">
                      Somos una comunidad que te ofrece la comodidad de poder
                      vender café especial de muy alta calidad certificado por
                      la escuela nacional del café u comprarlo por medio de esta
                      plataforma de la forma más confiable y segura
                    </p>
                  </div>
                  <div className=" flex justify-center items-center">
                    <button class="text-white bg-[#39A800] h-10 w-36 rounded-lg font-bold flex justify-center items-center">
                      Conoce más
                      <span class="ml-2 transform -rotate-45">
                        <FaArrowRight />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="self-center">
                <img
                  src="./src/assets/ImagenesIndex/img-2.jpg"
                  alt="imagen de quienes somos"
                  class=" w-11/12 mx-auto rounded-lg"
                />
              </div>
            </div>
          </section>
        </div>

        {/* ///---------------------------------------------------------------------------/// */}
        <div class="bg-[#FDFBF6]">
          <section
            id="quequeremos"
            class="h-screen relative flex flex-col items-center justify-center "
          >
            <div class="grid grid-cols-2 place-items-center px-20">
              <div class="self-center">
                <img
                  src="./src/assets/ImagenesIndex/img-3.jpg"
                  alt="imagen de quienes somos"
                  class="  w-11/12 mx-auto rounded-lg"
                />
              </div>
              <div class="flex flex-col items-center justify-center">
                <div class="grid grid-rows-3 gap-4">
                  <div className=" flex justify-center items-center">
                    <h2 class="font-semibold text-3xl">
                      Que queremos lograr !
                    </h2>
                  </div>
                  <div>
                    <p class="font-normal text-lg text-center text-[#919190]">
                      Lo que se quiere lograr con estar plataforma es poder unir
                      y crear una conexión entre compradores de café y cafeteros
                      que quieran vender su café especial
                    </p>
                  </div>
                  <div className=" flex justify-center items-center">
                    <button class="text-white bg-[#39A800] h-10 w-36 rounded-lg font-bold flex justify-center items-center">
                      Conoce más
                      <span class="ml-2 transform -rotate-45">
                        <FaArrowRight />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ///---------------------------------------------------------------------------/// */}
        <div class="   bg-[#FDFBF6]">
          <section
            id="beneficios"
            class="h-screen relative flex flex-col items-center justify-center "
          >
            <div className="w-full px-20 py-5">
              <h2 className="font-bold text-3xl text-[#323232] leading-loose">
                Beneficios
              </h2>
            </div>
            <div class="grid gap-20 grid-cols-2 place-items-center px-20 font-normal text-lg text-[#919190] leading-relaxed">
              <div className=" pr-30 ">
                <div className="bg-[#A6D290] h-10 w-10 flex flex-col items-center justify-center rounded-lg">
                  <TfiWorld className=" text-[#39A800] text-2xl" />
                </div>
                <div className=" font-medium text-xl text-[#323232]">
                  <h3>Conexión con Vendedores y Compradores</h3>
                </div>
                <div className="">
                  <p>
                    En SubCoffee te ofrecemos la facilidad de poder contactar
                    con todos los vendedores de café de la mas alta calidad y
                    los Compradores mas confiables registrados en esta
                    plataforma.{" "}
                  </p>
                </div>
              </div>
              <div className=" pl-20 ">
                <div className="bg-[#A6D290] h-10 w-10 flex flex-col items-center justify-center rounded-lg">
                  <FaRegCircleUser className=" text-[#39A800] text-2xl" />
                </div>
                <div className="font-medium text-xl text-[#323232]">
                  <h3>Plataforma intuitiva y fácil de usar</h3>
                </div>
                <div className="">
                  <p>
                    SubCoffee te ofrece una plataforma fácil de usar para
                    cualquier tipo de usuario ofreciendo comodidad visual y
                    armónica para todos.
                  </p>
                </div>
              </div>
              <div className="pr-30">
                <div className="bg-[#A6D290] h-10 w-10 flex flex-col items-center justify-center rounded-lg">
                  <RxLockClosed className=" text-[#39A800] text-2xl" />
                </div>
                <div className="font-medium text-xl text-[#323232]">
                  <h3>Seguridad de tus datos </h3>
                </div>
                <div className="">
                  <p>
                    Todos los datos que nos proporcionas estas muy bien
                    resguardados por nuestro sistema de seguridad para que nadie
                    mas pueda hacer uso de ellos (esta plataforma solo registra
                    Usuarios confiables de la Escuela Nacional del Café).
                  </p>
                </div>
              </div>
              <div className=" pl-20">
                <div className="bg-[#A6D290] h-10 w-10 flex flex-col items-center justify-center rounded-lg">
                  <IoCalendarOutline className=" text-[#39A800] text-2xl" />
                </div>
                <div className="font-medium text-xl text-[#323232]">
                  <h3>Experiencia SubCoffee</h3>
                </div>
                <div className="">
                  <p>
                    Brindamos una experiencia maravillosa de una subasta en line
                    para que puedas vender tu café a un mejor precio y no solo
                    eso si no que podrás Comprar café de la mas alta calidad
                    (certificado por la Escuela Nacional del Café).
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* ///---------------------------------------------------------------------------/// */}

      </div>
    </>
  );
}

export default DashboardContentOrganims;

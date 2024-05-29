import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LinkButtonAtom from "../components/atoms/LinkButtonAtom";
import TiposDeCafeOrganism from "../components/organisms/TiposDeCafeOrganism";

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
    <><div>
      {/* ///---------------------------------------------------------------------------/// */}
      <div>
  <section id="inicio" className="min-h-screen flex items-center justify-center">
    <div className="container mx-auto px-4 sm:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between md:justify-start w-full h-full ">
        <div className="md:w-1/2 mt-8 md:mt-0 relative left-1/4 text-center z-10">
          <span className="text-[#297707] text-4xl font-bold mb-4 md:mb-0">
            Bienvenido a SubCoffee
          </span>
          <p className="bg-gray-100 rounded-full text-lg text-gray-600 mb-4 w-full text-center">
            Una plataforma online donde te podrás conectar con diferentes usuarios para subastar y pujar por café de alta calidad.
          </p>
        </div>
        <div className="relative right-1/4 z-0 w-full h-full ">
          <img src="./src/assets/dashboard.png" alt="Dashboard" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
</div>

      {/* ///---------------------------------------------------------------------------/// */}

      <div className="w-full py-16 bg-[#f8efb3]">
        <section className="max-w-4xl mx-auto px-4">
          <h1 className="text-center text-4xl font-bold text-[#297707] mb-8">
            Una plataforma de café perfecta para todos
          </h1>
          <p className="text-center text-lg font-medium text-gray-600 mb-10">
            Subasta o puja por el café de tu gusto.
          </p>
          <TiposDeCafeOrganism />
        </section>
      </div>

      {/* ///---------------------------------------------------------------------------/// */}
      <div className="w-full grid grid-cols-2 justify-center p-12 gap-x-4 items-center">
  <section>
    <div className="px-12">
      <h2 className="text-3xl font-semibold my-4 text-[#297707]">Crear subasta</h2>
      <p className="text-gray-700">
        Crea una subasta con el tipo de café de tu preferencia, agrega la
        descripción del mismo e información que llame la atención de los
        demás. Asi, Los usuarios podrán verlo e interesarse en él. Puede ser
        un café clásico, exótico o una mezcla única que quieras ofrecer al
        mundo.
      </p>
      <div className="flex gap-x-8 mt-8">
        <LinkButtonAtom to="/subcoffee" className="bg-[#009100] text-white px-4 py-2 rounded-md hover:bg-[#e0e0e0]">Crear subasta</LinkButtonAtom>
        <LinkButtonAtom to="/ayuda" className="bg-[#e0e0e0] text-white px-4 py-2 rounded-md hover:bg-[#009100]">Como subastar</LinkButtonAtom>
      </div>
    </div>
  </section>
  <section>
    <div className="w-10/12">
      <img src="./src/assets/crearsubasta.jpg" alt="" className="mx-auto rounded-3xl" />
    </div>
  </section>
</div>

      {/* ///---------------------------------------------------------------------------/// */}
      <div className="w-full grid grid-cols-2 justify-center p-12 gap-x-4 items-center bg-[#f8efb3]">  
      <section>
    <div className="w-11/12">
      <img src="./src/assets/comunidadfeliz.avif" alt="" className="rounded-3xl" />
    </div>
  </section>
  <section>
    <div className="px-12">
      <h2 className="text-3xl font-semibold my-4 text-[#297707]">Pujar Por Una Subasta</h2>
      <p className="text-gray-700">
        Crea una subasta con el tipo de café de tu preferencia, agrega la
        descripción del mismo e información que llame la atención de los
        demás. Puede ser un café clásico, exótico o una mezcla única que quieras ofrecer al
        mundo.
      </p>
      <div className="flex gap-x-8 mt-8">
        <LinkButtonAtom to="/subcoffee" className="bg-[#009100] text-white px-4 py-2 rounded-md hover:bg-[#e0e0e0]">Empezar Puja</LinkButtonAtom>
        <LinkButtonAtom to="/ayuda" className="bg-[#e0e0e0] text-white px-4 py-2 rounded-md hover:bg-[#009100]">Como Pujar</LinkButtonAtom>
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

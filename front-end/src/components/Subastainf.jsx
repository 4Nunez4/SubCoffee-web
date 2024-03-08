import { FaRegFilePdf } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";

function SubastaInfoUser() {
  return (
    <div className="bg-green-500 border border-gray-400 rounded-se-2xl p-4">
      <div className="flex text-white justify-between">
        <div className="">
          <p>Subasta: Don juan</p>
        </div>
        <p className="">Subasta abierta</p>
        <p className="flex items-center"><IoMdTime /> 2:29 p.m.</p>
      </div>
      <div className="">
        <p className=""> Vendedor:</p>
        <div className="flex">
          <img src="./src/assets/profile_user.jfif" alt="Foto de usuario" className="w-14 h-14 rounded-full" />
          <div className="ml-2">
              <p className="text-xl"> Carlos Argote</p>
              <p className="text-sm"> 3157874593</p>
          </div>
        </div>
      </div>
      <div className=" m-2">
        <div className="flex">
          <img src="./src/assets/cafe1.jfif" alt="" className="rounded-xl w-44 mb-2"/>
          <img src="./src/assets/cafe2.jfif" alt="" className="rounded-xl w-44 mb-2"/>
        </div>
        <div className="flex gap-x-3">
          <img src="./src/assets/cafe2.jfif" alt="" className="rounded-sm w-10"/>
          <img src="./src/assets/cafe3.jfif" alt="" className="rounded-sm w-10"/>
          <img src="./src/assets/cafe4.jfif" alt="" className="rounded-sm w-10"/>
          <FaRegFilePdf className="w-6 h-6 text-gray-950"/>
          <FaRegFilePdf className="w-6 h-6 text-gray-950"/>
        </div>
      </div>

      <div className="">
        <p className="font-semibold">Detalles de la subasta:</p>
        <ul className="list-disc pl-6">
          <li>Fecha de finalización: 10 de marzo de 2024 a las 2:30 p.m.</li>
          <li>Variedad de café: Borbón</li>
          <li>Descripción: Café dulce con sabor a miel</li>
          <li>Puntuación: 92.5</li>
          <li>Valor inicial: $850.000</li>
        </ul>
      </div>
    </div>
  );
}

export default SubastaInfoUser;

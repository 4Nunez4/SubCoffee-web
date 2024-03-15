import SubastaInfoUser from "../components/Subastainf";
import { LuSend } from "react-icons/lu";

function Oferta() {
  return (
    <>
      <div className="text-2xl ">
        <div className=" grid grid-cols-2">
          <div
            className="bg-white  p-4  overflow-hidden hover:overflow-y-auto"
            style={{ maxHeight: "72vh" }}
          >
            <div className="flex items-center gap-x-2">
              <div>
                <img
                  src="./src/assets/profile_user.jfif"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-xs text-center">jorge</p>
              </div>
              <div className="">
                <div className="bg-gray-200 border border-gray-600 p-2 rounded-xl">
                  $400,000
                </div>
                <p className="text-xs">2024-03-08 10:40 a.m.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-2">
              <div className="">
                <div className="bg-gray-200 border border-gray-600 p-2 rounded-xl">
                  $500,000
                </div>
                <p className="text-xs">2024-03-08 10:41 a.m.</p>
              </div>
              <div>
                <img
                  src="./src/assets/profile_user4.jfif"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-xs text-center">Camila</p>
              </div>
            </div>
          </div>

          <SubastaInfoUser />
        </div>
      </div>
      <div className="bg-gray-400 flex items-center text-2xl">
        <div className="m-4 w-max ">
          <button class="bg-green-400 hover:bg-green-700 text-white font-bold py-5 px-5 rounded">
            +10.000{" "}
          </button>
          <button class=" bg-white hover:bg-amber-600 text-green-400 hover:text-white font-bold py-5 px-5 rounded">
            +50.000{" "}
          </button>
          <button class="bg-green-400 hover:bg-green-700 text-white  font-bold py-5 px-5 rounded">
            +100.000{" "}
          </button>
          <button class=" bg-white hover:bg-amber-600 text-green-400 hover:text-white font-bold py-5 px-5 rounded">
            +200.000{" "}
          </button>
          <button class="bg-green-400 hover:bg-green-700 text-white  font-bold py-5 px-5 rounded">
            +300.000{" "}
          </button>
          <button class=" bg-white hover:bg-amber-600 text-green-400 hover:text-white font-bold py-5 px-5 rounded">
            +400.000{" "}
          </button>
          <button class="bg-green-400 hover:bg-green-700 text-white  font-bold py-5 px-5 rounded">
            +500.000{" "}
          </button>
          <button class=" bg-white hover:bg-amber-600 text-green-400 hover:text-white font-bold py-6 px-6 rounded">
          <LuSend />{" "}
          </button>
          <p class="bg-amber-600  text-white text-center font-bold py-5 px-5 rounded">
            Supera este valor (500.000){" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Oferta;

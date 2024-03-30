import SubastaInfoUser from "../components/Subastainf";

function Subasta() {
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

            <div className="flex items-center gap-x-2">
              <div>
                <img
                  src="./src/assets/profile_user4.jfif"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-xs text-center">Camila</p>
              </div>
              <div className="">
                <div className="bg-gray-200 border border-gray-600 p-2 rounded-xl">
                  $500,000
                </div>
                <p className="text-xs">2024-03-08 10:40 a.m.</p>
              </div>
            </div>

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
                  $600,000
                </div>
                <p className="text-xs">2024-03-08 10:40 a.m.</p>
              </div>
            </div>
          </div>

          <SubastaInfoUser />
        </div>
      </div>
      <div className="bg-gray-400 flex justify-between items-center text-2xl  rounded-b-xl border ">
        <div className="justify-center w-2/4 grid grid-cols-2">
          <button class="bg-green-400 hover:bg-green-700 text-white font-bold  rounded">
            Cerrar Subasta{" "}
          </button>
          <button class=" bg-white hover:bg-amber-600 text-green-400 hover:text-white font-bold py-5 px-5 rounded">
            Iniciar conversacion{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Subasta;

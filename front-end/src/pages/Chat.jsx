import { FaGooglePlay  } from "react-icons/fa6";
import InfoChat from "../components/ChatInfo";
// import InfoSubasta from "../components/InfoSubasta";
import SubastaInfoUser from "../components/Subastainf";

function Chat() {
  return (
    <div className="p-3">
      <div className="grid grid-cols-2">
        <InfoChat />
        <SubastaInfoUser />
      </div>
      <div className="bg-gray-200 flex justify-between items-center rounded-b-xl border border-gray-400">
          <div className="m-4 relative w-2/4 mr-16 flex justify-center">
            <input type="text" placeholder="Buscar notificación" className="p-2 pl-4 pr-10 rounded border border-gray-400 w-full" />
            <button>
              <FaGooglePlay className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
            </button>
          </div>
          <div className="flex justify-center w-2/4">
            <p className="text-2xl font-semibold bg-green-50 text-green-500 py-2 px-5 border border-green-500 rounded-xl">Mayor puja: $<span>1.400.000</span> </p>
          </div>
      </div>
    </div>
  );
}

export default Chat;

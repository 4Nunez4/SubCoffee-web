import Infsubasta from "../components/infSubasta";
import SubastaInfoUser from "../components/Subastainf";


function Subasta() {
    return ( 
        <>
  <div className="p-3">
      <div className="grid grid-cols-2">
        <Infsubasta />
        <SubastaInfoUser />
      </div>
      <div className="bg-gray-200 flex justify-between items-center rounded-b-xl border border-gray-400"> 
          <div className="flex justify-center w-2/4">
            <p className="text-2xl font-semibold bg-green-50 text-green-500 py-2 px-5 border border-green-500 rounded-xl">Mayor puja: $<span>1.400.000</span> </p>
          </div>
      </div>
    </div>
        </>
     );
}

export default Subasta;
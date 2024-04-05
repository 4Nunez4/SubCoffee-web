import react from "React"

function BotonForm({ onClick, children }) {
    return (

        <div className="flex flex-col justify-center items-center">
        <button  onClick={(onClick) => alert("Datos Registrados Con Exito")} className="bg-slate-300 rounded-xl focus:outline-none focus:border-amber-700 px-3 py-2 cursor-pointer hover:border-black hover:bg-green-500 w-64" type="submit"><p className="font-semibold text-xl">{children}</p></button>
        </div>

    )
  }


export default BotonForm
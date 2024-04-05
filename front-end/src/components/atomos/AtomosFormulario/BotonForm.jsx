import React from "react"

function BotonForm({ children, TextBoton }) {
    return (

        <div className="flex flex-col justify-center items-center">
        <button  
        onClick={onClick}
        type={type}
        className="bg-slate-300 rounded-xl focus:outline-none focus:border-amber-700 px-3 py-2 cursor-pointer hover:border-black hover:bg-green-500 w-64">

        <p className="font-semibold text-xl">{TextBoton} </p> </button> 

        { children }

        </div>
    )
  }


export default BotonForm
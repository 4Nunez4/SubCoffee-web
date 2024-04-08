import React from "react";
import { FaX } from "react-icons/fa6";
import FormCrearSubasta from "../moleculas/FormCrearSubasta"

export const Modal = ({open, onClose }) => {
    return(
        <>
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">

                    <div className="flex flex-col justify-center bg-slate-50 shadow-md rounded-lg px-8 py-6 border max-w-[90%] max-h-[90%] auto-cols-auto border-stone-950 overflow-auto">

                   <FormCrearSubasta/>

                        <div>
                            <FaX className="cursor-pointer" onClick={onClose}/>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}
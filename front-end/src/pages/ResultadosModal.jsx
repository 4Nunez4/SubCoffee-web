import React, { useState } from "react";
import ModalForm from "../components/plantillas/CrearSubastaModal"

function ResultadoModal(){

    const[modalOpen, setModalOpen] = useState(false)



    return(
    <div>

        <button onClick={() => setModalOpen(true)}> Abrir </button>
        <ModalForm 
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        />
    </div>
    )
}

export default ResultadoModal
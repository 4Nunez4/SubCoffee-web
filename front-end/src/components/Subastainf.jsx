function SubastaInfoUser() {
    return ( <div>
        <p className="mb-4">Vendedor: Carlos Argote</p>
        <p className="mb-4">Contacto: 3157874593</p>

       
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <p className="font-semibold">Detalles de la subasta:</p>
            <ul className="list-disc pl-6">
                <li>ID: 109274</li>
                <li>Fecha de finalización: 10 de marzo de 2024 a las 2:30 p.m.</li>
                <li>Variedad de café: Borbón</li>
                <li>Descripción: Café dulce con sabor a miel</li>
                <li>Puntuación: 92.5</li>
                <li>Valor inicial: $850.000</li>
            </ul>
        </div>
    </div> );
}

export default SubastaInfoUser;
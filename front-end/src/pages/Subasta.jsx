import SubastaInfoUser from "../components/InfoSubasta";

function Subasta() {
    return ( 
        <>
        <div className="w-full h-full bg-gray-100 grid-cols-2 gap-3">
        <div className="max-w-3xl mx-auto p-4">
        
        <h1 className="text-2xl font-semibold mb-4">Subasta abierta</h1>
        <div className="flex-auto h-screen">
          <SubastaInfoUser />
          
        </div>
       
        <div class="bg-white rounded-lg shadow p-4 mb-6">
            <p class="font-semibold">Ofertas realizadas:</p>
            <ul class="list-disc pl-6">
                <li>Maria: $900.000 (12:50 p.m.)</li>
                <li>Alexander: $950.000 (12:52 p.m.)</li>
                <li>Maria: $1.000.000 (12:55 p.m.)</li>
                <li>Alexander: $1.250.000 (12:50 p.m.)</li>
                <li>Marcos: $1.350.000</li>
            </ul>
        </div>

        
        <button class="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Cierra subasta</button>
        <button class="bg-green-500 text-white px-4 py-2 rounded-md">Iniciar conversación</button>
    </div>
            
        </div>
            
        </>
     );
}

export default Subasta;
import React from 'react';

function InfoRolesA() {
    return (
        <div className="py-6">
            <h2 className="text-3xl font-semibold text-center mb-8 mt-4  text-black">Información de Roles</h2>
            <p className=" text-lg  text-center mb-8 mt-4">
                Aquí tienes información sobre los roles disponibles en nuestra
                plataforma:
            </p>
            <div className="grid grid-cols-1 gap-y-3">
            <div className="border rounded-lg shadow-lg p-4 bg-[#FDFBF6] text-[#919190] ">

                    <h3 className="mb-4  font-semibold text-3xl text-center text-black">Administrador</h3>
                    <p className='mb-4 text-lg '>
                        El administrador tiene el control total sobre la plataforma. Sus
                        funciones incluyen:
                    </p>
                    <ul className="list-disc list-inside mb-4 text-lg ">
                        <li>Crear y gestionar la información de localización.</li>
                        <li>
                            Definir y gestionar los tipos de variedades de café disponibles
                            para la subasta.
                        </li>
                        <li>
                            Registrar a los usuarios en la plataforma para una mejor
                            experiencia y control.
                        </li>
                        <li>
                            Llevar un registro detallado de la actividad en la plataforma y
                            corregir información incorrecta si es necesario.
                        </li>
                        <li>
                            Administrar las políticas de uso y términos de servicio.
                        </li>
                    </ul>
                </div>
                <div className="border rounded-lg shadow-lg p-4 bg-[#FDFBF6] text-[#919190] ">
                    <h3 className="mb-4  font-semibold text-3xl text-center text-black">Vendedor</h3>
                    <p className='mb-4 text-lg '>
                        El vendedor es responsable de agregar productos a la subasta. Sus
                        funciones incluyen:
                    </p>
                    <ul className="list-disc list-inside mb-4 text-lg ">
                        <li>Registrar una finca en la plataforma.</li>
                        <li>
                            Registrar las variedades de café disponibles para la subasta.
                        </li>
                        <li>
                            Crear y gestionar las subastas, utilizando la información
                            proporcionada anteriormente.
                        </li>
                        <li>
                            Gestionar la logística de entrega y envío de los productos
                            subastados.
                        </li>
                        <li>
                            Establecer precios y condiciones de venta para los productos
                            ofertados.
                        </li>
                    </ul>
                </div>
                <div className="border rounded-lg shadow-lg p-4 bg-[#FDFBF6] text-[#919190] ">
                    <h3 className="mb-4  font-semibold text-3xl text-center text-black">Comprador</h3>
                    <p className='mb-4 text-lg '>
                        El comprador participa en las subastas realizando ofertas por los
                        productos disponibles. Sus funciones incluyen:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Hacer ofertas en las subastas activas.</li>
                        <li>
                            Participar en el proceso de puja hasta la hora final establecida
                            por el vendedor.
                        </li>
                        <li>
                            Al finalizar la subasta, utilizar el chat para comunicarse con
                            el vendedor y coordinar el método de pago.
                        </li>
                        <li>
                            Revisar el historial de subastas y ofertas realizadas.
                        </li>
                        <li>
                            Acceder a información detallada sobre los productos y vendedores.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default InfoRolesA;

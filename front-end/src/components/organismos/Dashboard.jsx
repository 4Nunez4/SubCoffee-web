import logo from '../../assets/img1dashboard.png';
import { colors } from '../atomos/dashboard/themes.jsx';
import { IconDash, IconDashP } from '../atomos/Icon.jsx';
import ButtonRI from '../atomos/dashboard/ButtonRI.jsx';
import textPage from '../atomos/text.jsx';
import logoSub from '../../assets/logosubcoffe.png';
import borbon from '../../assets/cafe-borbon.jpg';
import caturra from '../../assets/cafe-caturra.jpg';
import tabi from '../../assets/cafe-tabiejm.jpg';
import typica from '../../assets/cafe-typica.jpg'
import FootPage from './FootPageO.jsx';


function Dashboard() {
 
  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
          <div className=" relative bg-white w-full h-auto overflow-hidden ">
              <img className="w-full h-4/5 object-cover  "src={logo}  />
              <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-center ">
                  <div className="flex items-center ">
                  <h1 className="text-7xl text-white font-bold">Sub</h1><h1 className="text-7xl  font-sans font-bold" style={{ color: colors.verdePage }}>Coffe</h1>
                  </div>
                  <p className="text-2xl text-white font-semibold pt-4">¡Subasta y compra café especial colombiano de la más alta calidad!</p>
                  <div className="pt-10 mx-0.5">

                  <ButtonRI to="/login">Iniciar Sesión</ButtonRI>
         
                   <ButtonRI to="" >Registrarse</ButtonRI>
                  </div>


              </div>
              </div>

          <div className="flex flex-wrap justify-center items-center my-12 mx-4">

          <div className="w-full md:w-1/2 pl-10 pt-12 flex justify-center items-center">
          <div className="w-36 md:w-auto">
             
                           <img src={logoSub} className="rounded-lg " />
               </div>
             </div>
                <div className="w-full md:w-1/2 pt-7 ">
                    <h2 className="font-sans font-bold text-4xl text-black mb-7 " style={{}}>¿Que es SubCoffe?</h2>
                        <p className="mb-4 font-sans text-2xl text-gray">SubCoffee conecta directamente a caficultores con aficionados al café a través de subastas transparentes y eficientes, enfocándose exclusivamente en café de especialidad para ofrecer acceso a granos de la más alta calidad.</p>

                    
            </div>
            <hr className="border-1 border-green-600 w-full mt-24" style={{ borderColor: colors.verdePage }} />
            
            <div className="w-full md:w-1/2 pt-7">
          <IconDashP title="Subastas Accesibles para Todos">
             <ul className="list-disc ml-4">
                <li>No alteramos los precios preestablecidos del café.</li>
                <li>Facilitamos la comercialización para obtener un valor justo por el producto.</li>
                <li>Apoyamos la sostenibilidad de la comunidad cafetalera.</li>
             </ul>
          </IconDashP>
        </div>
        <div className="w-full md:w-1/2 pt-7">
          <IconDash title="Valor Justo para Caficultores">
          <ul className="list-disc ml-4">
                <li>Eliminamos barreras para participar.</li>
                <li>Proporcionamos acceso a subastas transparentes y eficientes.</li>
                <li>Conectamos directamente a productores y compradores.</li>
          </ul>
          </IconDash>
        </div>
        <hr className="border-1 border-green-600 w-full mt-24" style={{ borderColor: colors.verdePage }} />

        <h1 className="font-bold pt-12 text-3xl mb-4">Subasta Categorías </h1>

        <div className="w-full pt-12 flex justify-between">
                    <div className="w-1/4 mx-1 border border-gray-300 rounded-lg p-4">
                        <p className="text-center font-bold mb-2">Caturra</p>
                        <img src={caturra} alt="Caturra" className="w-full rounded-lg mb-2" />
                        <br /><span className="font-semibold text-gray-800">Pitalito, Huila</span> <br /><span className="text-gray-700 pb-6">Fecha de fin: 2024-04-04</span>
                        <p className="text-sm text-gray-700">La variedad Caturra es conocida por su sabor suave y dulce, con notas de chocolate y frutos secos. </p>
                    </div>
                    <div className="w-1/4 mx-1 border border-gray-300 rounded-lg p-4">
                        <p className="text-center font-bold mb-2">Borbon</p>
                        <img src={borbon} alt="Borbon" className="w-full rounded-lg mb-2" />
                        <br /><span className="font-semibold text-gray-800">Pitalito, Huila</span> <br /><span className="text-gray-700 pb-6">Fecha de fin: 2024-04-04</span>
                        <p className="text-sm text-gray-700">La variedad Borbon tiene un sabor afrutado y floral, con un cuerpo medio y acidez equilibrada.</p>
                    </div>
                    <div className="w-1/4 mx-1 border border-gray-300 rounded-lg p-4">
                        <p className="text-center font-bold mb-2">Tabi</p>
                        <img src={tabi} alt="Tabi" className="w-full rounded-lg mb-2" />
                        <br /><span className="font-semibold text-gray-800">Pitalito, Huila</span> <br /><span className="text-gray-700 pb-6">Fecha de fin: 2024-04-04</span>
                        <p className="text-sm text-gray-700">La variedad Tabi es conocida por su perfil de sabor complejo, con notas frutales y florales y una acidez brillante.</p>
                    </div>
                    <div className="w-1/4 mx-1 border border-gray-300 rounded-lg p-4">
                        <p className="text-center font-bold mb-2">Typica</p>
                        <img src={typica} alt="Typica" className="w-full rounded-lg mb-2" />
                        <br /><span className="font-semibold text-gray-800">Pitalito, Huila</span> <br /><span className="text-gray-700 pb-6">Fecha de fin: 2024-04-04</span>
                        <p className="text-sm text-gray-700">La variedad Typica es apreciada por su sabor suave y equilibrado, con notas cítricas y chocolate.</p>
                    </div>
                </div>
                <hr className="border-1 border-green-600 w-full mt-24" style={{ borderColor: colors.verdePage }} />
               
        
                <div>
                    <div className="flex justify-center items-center">
                        <h1 className="text-7xl font-bold pt-10" style={{ color: colors.verdePage }}>Sub</h1>
                        <h1 className="text-7xl text-black font-sans font-bold pt-10">Coffe</h1>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 pt-11">Únete a la Comunidad del Café Especial</h2>
                </div>

                <div className="w-full flex justify-center items-center pt-2">
                    <div className="w-1/2 mx-32 rounded-lg p-4 text-center">
                        <p className="text-base text-gray-700 pb-5">Cada clic es una oportunidad. No temas pujar, porque detrás de cada número hay una historia de tierra, sol y dedicación. ¡Haz tu oferta y sé parte de la magia del café!</p>
                        <ButtonRI to="/registro">Registrarse</ButtonRI>
                    </div>
                    <div className="w-1/2 mx-32 rounded-lg p-4 text-center">
                        <p className="text-base text-gray-700 pb-5">Tu puja es tu voz en esta danza de granos. Eleva tus ofertas con confianza y deja que el aroma del café guíe tus movimientos. ¡Que cada lote sea una sinfonía de pasión y sabor!</p>
                        <ButtonRI to="/login">Iniciar Sesión</ButtonRI>
                    </div>
                </div>
            </div>
            <FootPage />
        </div>
    );
}

export default Dashboard;
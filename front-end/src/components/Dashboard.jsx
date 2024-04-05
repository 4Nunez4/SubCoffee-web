import logo from '../assets/img1dashboard.png';
import cafe from '../assets/cafe-dashboard-2.jpg';
import { colors } from './atomos/themes';
import { IconDash, IconDashP } from './atomos/Icon';
import ButtonRI from './atomos/ButtonRI';
import textPage from './atomos/text';
import logoSub from '../assets/logosubcoffe.png';
import borbon from '../assets/cafe-borbon.jpg';
import caturra from '../assets/cafe-caturra.jpg';
import tabi from '../assets/cafe-tabiejm.jpg';
import typica from '../assets/cafe-typica.jpg'


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
        {/* <hr className="border-1 border-green-600 w-full mt-24" style={{ borderColor: colors.verdePage }} /> */}



     

        <div>
  <h1 className="text-4xl md:text-6xl font-bold text-center my-8">Categorías</h1>
  <div className="flex justify-center items-center space-x-4">
    <img src={caturra} alt="Imagen 1" className="rounded-lg h-28 md:h-28" />
    <img src={caturra} alt="Imagen 2" className="rounded-lg h-28 md:h-28" />
    <img src={caturra} alt="Imagen 3" className="rounded-lg h-28 md:h-28" />
  </div>
</div>

</div>



                
     
  </div>



  );
}

export default Dashboard;

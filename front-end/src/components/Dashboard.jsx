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



        <h1>Categorias</h1>

<div id="default-carousel" class="relative w-full" data-carousel="slide">
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-1.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-2.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-3.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
        </div>
        
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-4.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-5.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
        </div>
    </div>

    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>




                
     
  </div>
</div>


  


  );
}

export default Dashboard;

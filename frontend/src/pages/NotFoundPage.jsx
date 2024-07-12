import { Link } from "react-router-dom";

const NotFoundPage = () => {

  const users = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="bg-blancoMedio1 flex h-screen items-center justify-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-20">
        <img src="./src/assets/notfound.png" alt="Error 404" className="h-2/4 w-2/4"/>
        <div className="text-center md:text-left">
          <h2 className="text-grisOscuro text-5xl font-semibold">ERROR 404</h2>
          <h1 className="text-grisMedio3 text-5xl mb-3 md:mt-20 md:mb-6">
            Vaya, parece que la página que estás buscando no existe.
          </h1>
          <p className="text-grisOscuro text-xl mb-8">
            Pero no te vayas, vuelve e inténtalo de nuevo.
          </p>
          <Link to={`${users ? '/subcoffee' : '/'}`} className="bg-gray-300 hover:bg-gray-600 hover:text-white font-semibold text-base py-3 px-6 rounded-lg transition duration-200">
            Volver al Inicio
          </Link> 
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;

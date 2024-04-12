import React from 'react';
import ImagenesSliderOrganism from '../components/organisms/ImagenesSliderOrganism';

function ComoPujarUnaSubasta() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Cómo pujar en una subasta</h2>
      {/* <ImagenesSliderOrganism /> */}
      <p className="mb-4">
        Para pujar en una subasta en nuestra plataforma, sigue estos sencillos pasos:
      </p>
      <h3 className="text-lg font-semibold mb-2">1. Inicia sesión</h3>
      <p className="mb-4">
        Ingresa con tu correo electrónico y contraseña en nuestra plataforma.
      </p>
      <h3 className="text-lg font-semibold mb-2">2. Busca la subasta de tu interés</h3>
      <p className="mb-4">
        Explora las subastas disponibles en nuestra plataforma y encuentra aquella que se ajuste a tus preferencias y necesidades.
      </p>
      <h3 className="text-lg font-semibold mb-2">3. Accede a la subasta</h3>
      <p className="mb-4">
        Una vez que encuentres la subasta deseada, accede a ella para revisar toda la información relevante, como el tipo de café, variedad, precio inicial, fecha de inicio y finalización, etc.
      </p>
      <h3 className="text-lg font-semibold mb-2">4. Inserta tus ofertas</h3>
      <p className="mb-4">
        Dentro de la subasta, encontrarás la opción para realizar tus ofertas. Ingresa el monto que estás dispuesto a pagar por el lote de café y confirma tu oferta.
      </p>
      <p>
        Recuerda que puedes realizar múltiples ofertas durante el período de la subasta, así que mantente atento a las actualizaciones y realiza tus pujas estratégicamente.
      </p>
    </div>
  );
}

export default ComoPujarUnaSubasta;

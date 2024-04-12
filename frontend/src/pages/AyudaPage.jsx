import React from "react";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

function AyudaPage() {
  return (
    <div className="p-8">
      <h1 className="text-center text-3xl font-semibold mb-4">
        ¿Cómo podemos ayudarte?
      </h1>
      <p className="mb-2 font-semibold">Explora por tema</p>
      <div className="grid grid-cols-3 gap-x-5">
        <Link
          to={"/ayudacrearsubasta"}
          className="flex items-center border rounded-lg p-4 bg-green-200 mb-4"
        >
          <FaRegArrowAltCircleDown className="text-3xl text-green-600 mr-4" />
          <div>
            <p className="font-semibold mb-1">Cómo crear una subasta</p>
            <p className="text-sm">
              Aprende el paso a paso que se debe seguir para crear una subasta.
            </p>
          </div>
        </Link>
        <Link
          to={"/ayudacrearsubasta"}
          className="flex items-center border rounded-lg p-4 bg-green-200 mb-4"
        >
          <FaRegArrowAltCircleDown className="text-3xl text-green-600 mr-4" />
          <div>
            <p className="font-semibold mb-1">Cómo crear una subasta</p>
            <p className="text-sm">
              Aprende el paso a paso que se debe seguir para crear una subasta.
            </p>
          </div>
        </Link>
        <Link
          to={"/ayudacrearsubasta"}
          className="flex items-center border rounded-lg p-4 bg-green-200 mb-4"
        >
          <FaRegArrowAltCircleDown className="text-3xl text-green-600 mr-4" />
          <div>
            <p className="font-semibold mb-1">Cómo crear una subasta</p>
            <p className="text-sm">
              Aprende el paso a paso que se debe seguir para crear una subasta.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AyudaPage;

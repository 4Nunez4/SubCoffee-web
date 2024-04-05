import React from "react";

function ImagenSubasta({ ImagenSuba, ImagenAlt }) {
  <div className="flex flex-col">
        <img
            src={ImagenSuba}
            alt={ImagenAlt}
            className="flex w-[60%] h-full "
        />
    </div>
}

export default ImagenSubasta;
import React from "react";

function ImageGallery({ images }) {
    return (
        <div className="flex">
            {images.map((image, index) => (
                <img key={index} src={image} alt="" className="rounded-sm w-10" />
            ))}
        </div>
    );
}

export default ImageGallery;

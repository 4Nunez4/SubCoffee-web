import React from "react";
import { FaGooglePlay } from "react-icons/fa6";

function Button() {
    return (
        <button>
            <FaGooglePlay className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </button>
    );
}

export default Button;

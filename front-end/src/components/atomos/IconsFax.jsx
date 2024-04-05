import React from "react";
import { FaX } from "react-icons/fa6";

function IconFax({onClose}) {
    return(
        <div>
            <FaX className="cursor-pointer" onClick={onClose} />
        </div>
    )
}

export default IconFax
import React from "react";

function TextForm({ Children }) {
    return(
        <div className="flex flex-col z-10">
            <p className="flex flex-col justify-center items-center ml-96 text-xl mb-4 z-10 font-semibold"></p> 
            {Children}
        </div>

    )
}

export default TextForm;


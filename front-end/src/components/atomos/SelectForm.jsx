import React from "react";

const SelectForm = React.forwardRef(({type}, ref) => {
    return(
        <div className="flex flex-col">
            <input
            type={type}
            ref={ref}
            required
            className="shadow-sm rounded-md px-3 py-2 w-full border border-black focus:outline-none focus:border-red-700 mb-2 top-4 cursor-pointer"
            />
        </div>
    )
})

export default SelectForm
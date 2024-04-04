import React from "react";
import Input from "../atomos/Input";
import Button from "../atomos/Button";

function SearchBar({ placeholder }) {
    return (
        <div className="m-4 relative w-2/4 mr-16 flex justify-center">
            <Input placeholder={placeholder} />
            <Button />
        </div>
    );
}

export default SearchBar;

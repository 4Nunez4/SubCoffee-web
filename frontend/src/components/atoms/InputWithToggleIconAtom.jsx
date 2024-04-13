import React, { useState } from "react";
import { icono } from "./IconsAtom";

const InputWithToggleIconAtom = React.forwardRef(({ icon: Icon, placeholder }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grisMedio3" />
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        ref={ref}
        className="pl-10 pr-10 py-2 w-full rounded-md border border-grisClaro shadow-sm focus:border-verdeSena2 focus:ring-0"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grisMedio3 focus:outline-none"
      >
        {showPassword ? <icono.iconoConOjo /> : <icono.iconoConOjoCerrado />}
      </button>
    </div>
  );
})

export default InputWithToggleIconAtom;

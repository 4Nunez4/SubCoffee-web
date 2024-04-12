import React from "react";

const InputWithIconAtom = React.forwardRef(({ icon: Icon, placeholder, type }, ref) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grisMedio3" />
      <input
        placeholder={placeholder}
        type={type}
        ref={ref}
        required
        className="pl-10 pr-4 py-2 w-full rounded-md border border-grisClaro shadow-sm focus:border-verdeSena2 focus:ring-0"
      />
    </div>
  );
});

export default InputWithIconAtom;

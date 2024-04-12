import React from "react";

const SelectInputAtom = React.forwardRef(({ children }, ref) => {
  return (
    <select
      ref={ref}
      className="mt-1 w-full border rounded-md border-grisClaro shadow-sm p-2 text-gridMedio1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    >
      <option value="" hidden label="Seleccione un rol" />
      {children}
    </select>
  );
});

export default SelectInputAtom;

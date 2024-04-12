import React from "react";

const OptionAtom = ({ value, label }) => {
  return (
    <option value={value} className="text-negro">
      {label}
    </option>
  );
};

export default OptionAtom;
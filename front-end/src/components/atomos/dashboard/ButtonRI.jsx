import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "./themes";

function ButtonRI(props) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(props.to);
  };

  const buttonStyles = {
    backgroundColor: colors.verdePage
  };

  return (
    <button onClick={handleButtonClick} className={`hover:bg-black  hover:text-white font-bold py-2 px-4 rounded ${props.className}`} style={buttonStyles}>
      {props.children}
    </button>
  );    
}

export default ButtonRI;

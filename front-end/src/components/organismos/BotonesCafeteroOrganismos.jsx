import React from 'react';

import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

import {Button} from "@nextui-org/react";

const ButtonCafeteroOrganism = () => {
  return (
    <div className="grid grid-cols-1 gap-2   bg-gray-100 h-full rounded-lg ">
      <Button color="warning" variant="shadow" className=' h-full text-white' >
       <IoChatbubbleEllipsesSharp /> chat
      </Button>
      <Button color="warning" variant="shadow"  className=' h-full text-white'>
       <FaTrashCan /> ofertadores
      </Button>
      <Button color="warning" variant="shadow" className=' h-full text-white' >
       <FaTrashCan /> finalizar
      </Button>
    </div>
  );
};

export default ButtonCafeteroOrganism;
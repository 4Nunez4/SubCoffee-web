import React from 'react';

import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

import {Button} from "@nextui-org/react";

const ButtonOfertaOrganism = () => {
  return (
    <div className="grid grid-cols-1 gap-2   bg-gray-100 h-full rounded-lg ">
      <Button color="warning" variant="shadow" className=' h-full text-white' >
       <IoChatbubbleEllipsesSharp /> postores
      </Button>
      <Button color="warning" variant="shadow"  className=' h-full text-white'>
       <FaTrashCan /> yo
      </Button>
      <Button color="warning" variant="shadow" className=' h-full text-white' >
       <FaTrashCan /> abandonar
      </Button>
    </div>
  );
};

export default ButtonOfertaOrganism;
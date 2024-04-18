import React from "react";
import SliderAtom from "../atomos/TargetaPujaIncremento/EstiloRangoSlider";

import { Card, CardBody, Button } from "@nextui-org/react";
import { AiOutlineDollar } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";


const CardMolecule = ({ amount, handleSliderChange, onIncrement, onDecrement }) => {
 
  const formatAmount = (value) => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
 };
  return (
    <Card
      isBlurred
      className="border-none bg-lime-600  items-center justify-center"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col mt-3 gap-1">
          <div className="p-4 text-white">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl font-semibold">2 yo</p>
              <p className="text-xl font-semibold">${formatAmount(amount)}</p>
            </div>
            <SliderAtom value={amount} onChange={handleSliderChange} />
            <p className="text-center mt-4">aumentar + ${formatAmount(amount) + 0}</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center ">
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
            onClick={onDecrement} 
          >
            <AiOutlineMinusCircle size={54}  className="text-white"/>
          </Button>
          <Button
            isIconOnly
            className="w-auto h-auto data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <AiOutlineDollar size={60} className="text-white" />
          </Button>
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
            onClick={onIncrement} 
          >
            <AiOutlinePlusCircle size={54} className="text-white" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardMolecule;

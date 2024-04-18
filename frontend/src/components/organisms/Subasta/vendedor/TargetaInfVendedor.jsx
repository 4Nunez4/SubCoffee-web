import React from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const TargetaInfVendedor = () => {
  return (
      <Card className="py-4 overflow-hidden place-content-center h-full bg-verdeSena1 text-white">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Jorge Enrique Nuñez Molina</h4>
        <p className="text-tiny uppercase font-bold">cedula</p>
        <p className="text-tiny uppercase font-bold">telefono</p>
        
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="../../../../assets/cafe1.jfif"
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default TargetaInfVendedor;
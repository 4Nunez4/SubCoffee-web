import React, { useState } from 'react';
import CardMolecule from '../moleculas/TargetaPujaVT';

const CardOrganism = () => {
  const [amount, setAmount] = useState(0);

  const handleSliderChange = (e) => {
    setAmount(Number(e.target.value));
  };

  return <CardMolecule amount={amount} handleSliderChange={handleSliderChange} />;
};

export default CardOrganism;
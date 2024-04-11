import React, { useState } from 'react';
import CardMolecule from '../moleculas/TargetaPujaVT';

const CardOrganism = () => {
  const [amount, setAmount] = useState(0);

  const handleIncrement = () => {
    setAmount(prevAmount => prevAmount < 5000000 ? prevAmount + 10000 : 5000000);
 };

 const handleDecrement = () => {
  setAmount(prevAmount => prevAmount > 0 ? prevAmount - 10000 : 0);
 };

  const handleSliderChange = (e) => {
    setAmount(Number(e.target.value));
  };

  return <CardMolecule amount={amount} handleSliderChange={handleSliderChange}  onIncrement={handleIncrement} onDecrement={handleDecrement}/>;
};

export default CardOrganism;
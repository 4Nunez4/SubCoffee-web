import React, { useState } from 'react';
import TargetaPuja from '../../../molecules/subasta/TargetaPuja';

const TargetaSliderPuja = () => {
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

  return <TargetaPuja amount={amount} handleSliderChange={handleSliderChange}  onIncrement={handleIncrement} onDecrement={handleDecrement}/>;
};

export default TargetaSliderPuja;
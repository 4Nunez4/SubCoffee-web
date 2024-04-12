import React, { useEffect, useState } from "react";
import TextLgAtom from "../atoms/TextLgAtom";

function MessageOfLifeMolecule() {
  const [messages] = useState([
    "La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon",
    "No esperes a que pase la tormenta, aprende a bailar bajo la lluvia.",
    "No importa cuántas veces te caigas, lo importante es cuántas veces te levantes.",
    "La vida es un viaje, no un destino. Disfruta el viaje.",
  ]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [messages.length]);

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <TextLgAtom text={messages[currentMessageIndex]} />
    </div>
  );
}

export default MessageOfLifeMolecule;

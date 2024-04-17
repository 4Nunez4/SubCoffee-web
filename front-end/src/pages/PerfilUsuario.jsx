import React from "react";
import {Chip} from "@nextui-org/react";

const initialFruits = ["Subastas", "Variedades", "Fincas", "Populares", "Pitalito"]

export default function App() {
  const [fruits, setFruits] = React.useState(initialFruits);

  const handleClose = (fruitToRemove) => {
    setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
    if (fruits.length === 1) {
      setFruits(initialFruits);
    }
  };

  return (
    <div>
      <div className="flex gap-2 border-3 border-black p-6">
        {fruits.map((fruit, index) => (
          <Chip key={index} onClose={() => handleClose(fruit)} variant="flat">
            {fruit}
          </Chip>
        ))}
      </div>
      <div className="border-t-1 mr-80 border-black my-4"></div>
      <div className="border-t-1 mr-80 border-black my-4"></div>
      <div className="border-t-1 mr-80 border-black my-4"></div>
      <div className="border-t-1 mr-80 border-black my-4"></div>
    </div>
  );
  
}

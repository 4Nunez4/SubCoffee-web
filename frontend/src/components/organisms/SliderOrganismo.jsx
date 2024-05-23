import React from "react";
import {Slider} from "@nextui-org/react";

export default function SliderOferta({value,onChange}) {
  return (
    <Slider 
      label="Aumentar puja"
      step={50000} 
      maxValue={1000000} 
      minValue={0} 
      value={value}
      onChange={onChange}
      defaultValue={60}
      showSteps={true}
      showTooltip={true}
      showOutline={true}
      disableThumbScale={true}
      formatOptions={{style: "currency", currency: "USD"}}
      tooltipValueFormatOptions={{style: "currency", currency: "USD", maximumFractionDigits: 0}}
      classNames={{
        base: "max-w-md",
        filler: "bg-gradient-to-r from-[#009100] to-[#6ccb6f]",
        labelWrapper: "mb-2",
        label: "font-medium text-default-700 text-medium",
        value: "font-medium text-default-500 text-small",
        thumb: [
          "transition-size",
          "bg-gradient-to-r from-[#6ccb6f] to-[#009100]",
          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
          "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
        ],
        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
      }}
      tooltipProps={{
        offset: 10,
        placement: "bottom",
        classNames: {
          base: [
            // arrow color
            "before:bg-gradient-to-r before:from-[#6ccb6f] before:to-[#009100]",
          ],
          content: [
            "py-2 shadow-xl",
            "text-white bg-gradient-to-r from-[#6ccb6f] to-[#009100]",
          ],
        },
      }}
    />
  );
}

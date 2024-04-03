import React from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { GiCoffeeBeans } from "react-icons/gi";
import { MdPeople } from "react-icons/md";

export const PdfIcon = () => <FaRegFilePdf className="w-6 h-6 text-gray-950" />;

export const IconDash = ({title, children }) => 
    <div className="flex flex-col items-center space-y-2 pl-12">
    <GiCoffeeBeans className="mt-20  w-20 h-14 text-orange-950"/>
    {title && <h3 className=" font-sans text-2xl font-semibold mb-2">{title}</h3>}
    {children && <p className="pt-6 font-sans text-xl">{children}</p>}
    </div>

export const IconDashP = ({ title, children }) => 
    <div className="flex flex-col items-center space-y-3 pl-12">
    <MdPeople className="mt-20  w-20 h-14 text-orange-500 "/>
    {title && <h3 className=" font-sans text-2xl font-semibold mb-2 ">{title}</h3>}
    {children && <p className="pt-6 font-sans text-xl">{children}</p>}
    </div>
    

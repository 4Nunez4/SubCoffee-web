import React from "react";
import PdfIcon from "../atomos/Textarea";
import UserInfo from "../moleculas/UserInfo";
import ImageGallery from "../moleculas/ImageGallery";

function AuctionInfo() {
    return (
        <div className="bg-green-500 border border-gray-400 rounded-se-2xl p-4">
            <div className="flex text-white justify-between">
                <div className="">
                    <p>Subasta: Don juan</p>
                </div>
                <p className="">Subasta abierta</p>
                <p className="flex items-center">2:29 p.m.</p>
            </div>
            <div className="py-3">
                <p className=""> Vendedor:</p>
                <UserInfo name="Carlos Argote" phone="3157874593" imageUrl="./src/assets/profile_user.jfif" />
            </div>
            <div className="flex">
                <img src="./src/assets/cafe1.jfif" alt="" className="rounded-xl w-44 mb-2" />
                <img src="./src/assets/cafe2.jfif" alt="" className="rounded-xl w-44 mb-2" />
            </div>
            <div className=" m-2">
                <ImageGallery images={["./src/assets/cafe1.jfif", "./src/assets/cafe2.jfif", "./src/assets/cafe2.jfif", "./src/assets/cafe3.jfif", "./src/assets/cafe4.jfif"]} />
                <div className="flex gap-x-3">
                    <PdfIcon />
                    <PdfIcon />
                </div>
            </div>
            <div className="">
                <p className="font-semibold">Detalles de la subasta:</p>
                <ul className="list-disc pl-6">
                    <li>Fecha de finalización: 10 de marzo de 2024 a las 2:30 p.m.</li>
                    <li>Variedad de café: Borbón</li>
                    <li>Descripción: Café dulce con sabor a miel</li>
                    <li>Puntuación: 92.5</li>
                    <li>Valor inicial: $850.000</li>
                </ul>
            </div>
        </div>
    );
}

export default AuctionInfo;

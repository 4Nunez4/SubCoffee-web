import React from "react";
import { FaGooglePlay } from "react-icons/fa6";
import SearchBar from "../moleculas/SearchBar";

function NotificationBar() {
    return (
        <div className="bg-gray-200 flex justify-between items-center rounded-b-xl border border-gray-400">
            <SearchBar placeholder="Buscar notificación" />
            <div className="flex justify-center w-2/4">
                <p className="text-2xl font-semibold bg-green-50 text-green-500 py-2 px-5 border border-green-500 rounded-xl">Mayor puja: $<span>1.400.000</span> </p>
            </div>
        </div>
    );
}

export default NotificationBar;

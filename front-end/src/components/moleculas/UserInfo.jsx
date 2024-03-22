import React from "react";

function UserInfo({ name, phone, imageUrl }) {
    return (
        <div className="flex">
            <img src={imageUrl} alt="Foto de usuario" className="w-14 h-14 rounded-full" />
            <div className="ml-2">
                <p className="text-xl">{name}</p>
                <p className="text-sm">{phone}</p>
            </div>
        </div>
    );
}

export default UserInfo;

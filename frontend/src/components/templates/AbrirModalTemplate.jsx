import React from "react";

function AbrirModalTemplate({ children }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="absolute bg-white rounded-xl p-2">
        <div className="flex h-full">
          <div className="bg-white py-6 px-8 rounded-xl flex flex-col justify-center items-center gap-5">
            <div className="mx-auto max-w-sm space-y-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbrirModalTemplate;

import React from "react";
import ButtonCerrarModalAtom from "../atoms/ButtonCerrarModalAtom";

function ModalForms({ open, onClose, children }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#E6E6E6] flex overflow-auto max-w-90vw max-h-90vh p-5 rounded-xl  justify-center gap-3 lg:w-1/2 z-50">
            {children}
            <div>
              <ButtonCerrarModalAtom onclick={onClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalForms;

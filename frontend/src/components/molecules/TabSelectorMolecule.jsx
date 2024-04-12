import React from 'react'
import ButtonTabAtom from '../atoms/ButtonTabAtom';

function TabSelectorMolecule({ activeTab, handleShowNotifications, handleShowMessages }) {
    return (
      <div className="flex text-sm w-full text-center">
        <ButtonTabAtom
          onClick={handleShowNotifications}
          active={activeTab === "notificaciones"}
          text="Notificaciones"
          color="blue"
        />
        <ButtonTabAtom
          onClick={handleShowMessages}
          active={activeTab === "mensajes"}
          text="Mensajes"
          color="green"
        />
      </div>
    );
  };

export default TabSelectorMolecule
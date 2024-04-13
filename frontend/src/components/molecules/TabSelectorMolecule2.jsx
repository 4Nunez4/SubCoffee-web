import React from 'react'
import ButtonTabAtom from '../atoms/ButtonTabAtom';

function TabSelectorMolecule2({ activeTab, handleShowNotifications, handleShowMessages }) {
    return (
      <div className="flex text-sm w-full text-center">
        <ButtonTabAtom
          onClick={handleShowNotifications}
          active={activeTab === "usuarios"}
          text="usuarios"
          color="blue"
        />
        <ButtonTabAtom
          onClick={handleShowMessages}
          active={activeTab === "subastas"}
          text="subastas"
          color="green"
        />
      </div>
    );
  };

export default TabSelectorMolecule2
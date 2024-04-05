import React from 'react';
import AvatarWithTextMolecule from '../moleculas/AvataryTextoInfoCaf';
import { ContactInfoAtom, FaPhoneAlt, FaAddressCard } from '../atomos/TargetaDueñoSubasta/ContactoInformacionAtomo'
import TextAtom from '../atomos/TargetaDueñoSubasta/TextoDueñoSubastaAtomo';

const ContactCardOrganism = () => {
  return (
    <div className="h-full bg-blue-500 rounded-lg shadow-md overflow-hidden place-content-center text-white">
      <div className="p-4  grid grid-rows-3 grid-flow-col gap-3">
        <AvatarWithTextMolecule src="/src/assets/profile_user4.jfif" />
        <TextAtom>Camilo montolla </TextAtom>
        <div className="grid grid-rows-2 grid-flow-col gap-2 text-center place-content-center">
          <ContactInfoAtom icon={<FaPhoneAlt />} text="3203986077" />
          <ContactInfoAtom icon={<FaAddressCard />} text="1079534436" />
        </div>
      </div>
    </div>
  );
};

export default ContactCardOrganism;
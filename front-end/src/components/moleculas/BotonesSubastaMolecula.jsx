// ButtonWithIconMolecule.jsx
import React from 'react';
import IconAtom from '../atomos/TargetaBotonesSubasta/IconosBotonesSubastaAtomo';
import TextAtom from '../atomos/TargetaDueñoSubasta/TextoDueñoSubastaAtomo';
import ButtonAtom from '../atomos/TargetaBotonesSubasta/botonSubastaAtomo';

const ButtonWithIconMolecule = ({ icon, text }) => {
  return (
    <ButtonAtom>
      <IconAtom icon={icon} />
      <TextAtom>{text}</TextAtom>
    </ButtonAtom>
  );
};

export default ButtonWithIconMolecule;

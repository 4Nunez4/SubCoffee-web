import React from 'react';
import Avatar from '../atomos/Avatar';
import TextAtom from '../atomos/TargetaDueñoSubasta/TextoDueñoSubastaAtomo';

const AvatarWithTextMolecule = ({ src, text }) => {
  return (
    <div className="grid justify-items-center">
      <Avatar src={src} />
      <TextAtom>{text}</TextAtom>
    </div>
  );
};

export default AvatarWithTextMolecule;

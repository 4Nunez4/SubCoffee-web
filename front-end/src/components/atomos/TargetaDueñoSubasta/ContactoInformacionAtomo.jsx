import React from 'react';
import { FaPhoneAlt, FaAddressCard } from 'react-icons/fa';

const ContactInfoAtom = ({ icon, text }) => {
  return (
    <div className="flex justify-center items-center text-xl">
      {icon}
      <p>{text}</p>
    </div>
  );
};

export { FaPhoneAlt, FaAddressCard, ContactInfoAtom };
import React, { useState } from 'react';
import { Button, Input, ModalFooter } from '@nextui-org/react';
import { useAuthContext } from '../../context/AuthContext';
import { EyeSlashFilledIcon } from '../../nextui/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../../nextui/EyeFilledIcon';
import { icono } from '../atoms/IconsAtom';

const RecuperarPasswordUserLogin = ({ titleBtn, onClose }) => {
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const { updatePasswordLogin, errors } = useAuthContext();
  const [formData, setFormData] = useState({
    email_user: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePasswordLogin(formData);
      onClose();
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 px-4">
      {errors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
            {error}
          </div>
        ))
      }  
      <Input
        label=""
        aria-label="Email de usuario"
        variant="bordered"
        placeholder="Email de usuario"
        startContent={<icono.iconoGmail />}
        isRequired
        isClearable
        type="email"
        value={formData.email_user}
        name="email_user"
        onChange={handleChange}
      />
      <Input
        label=""
        aria-label="Nueva Contraseña"
        variant="bordered"
        placeholder="Nueva Contraseña"
        startContent={<icono.iconoContraseña />}
        endContent={
          <button
            type="button"
            onClick={toggleVisibilityNew}
            className="focus:outline-none"
          >
            {isVisibleNew ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisibleNew ? 'text' : 'password'}
        value={formData.newPassword}
        name="newPassword"
        onChange={handleChange}
      />
      <Input
        label=""
        aria-label="Confirmar Contraseña"
        variant="bordered"
        placeholder="Confirmar Contraseña"
        startContent={<icono.iconoContraseña />}
        endContent={
          <button
            type="button"
            onClick={toggleVisibilityConfirm}
            className="focus:outline-none"
          >
            {isVisibleConfirm ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisibleConfirm ? 'text' : 'password'}
        value={formData.confirmPassword}
        name="confirmPassword"
        onChange={handleChange}
      />
      <ModalFooter className="flex justify-center">
        <Button type="button" color="default" onClick={onClose} className="text-[#39A800] bg-[#FDFBF6] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#39A800] border-2">
          Cancelar
        </Button>
        <Button type="submit" className="text-[#FDFBF6] bg-[#39A800] h-10 w-36 rounded-lg font-bold flex justify-center items-center border-[#FDFBF6]">{titleBtn}</Button>
      </ModalFooter>
    </form>
  );
};

export default RecuperarPasswordUserLogin;

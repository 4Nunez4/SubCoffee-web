import { createContext, useState } from "react";
import {
  getUser,
  createUser,
  updateUser,
  activarUser,
  desactivarUser,
  loginUser,
} from "../api/api.users";
import ModalMessage from "../nextui/ModalMessage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);

  const getUsers = async () => {
    try {
      const response = await getUser();
      setUsers(response.data.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }

  const loginUsers = async (dataForm) => {
    try {
      const response = await loginUser(dataForm)
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setMensaje(response.data.message)
      setModalMessage(true)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors([error.response.message]);
    }
  }

  const createUsers = async (data) => {
    try {
      const response = await createUser(data)
      getUsers()
      setMensaje(response.data.message)
      setModalMessage(true)
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateUsers = async (id, data) => {
    try {
      const response = await updateUser(id, data)
      getUsers()
      setMensaje(response.data.message)
      setModalMessage(true)
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const updateUserActive = async (id) => {
    try {
      const response = await activarUser(id)
      getUsers()
      setMensaje(response.data.message)
      setModalMessage(true)
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }
  const updateUserDesactive = async (id) => {
    try {
      const response = await desactivarUser(id)
      getUsers()
      setMensaje(response.data.message)
      setModalMessage(true)
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        users,
        errors,
        setIsAuthenticated,
        loginUsers,
        getUsers,
        createUsers,
        updateUsers,
        updateUserActive,
        updateUserDesactive,
        setUsers,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

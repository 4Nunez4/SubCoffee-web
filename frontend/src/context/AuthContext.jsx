import { createContext, useEffect, useState } from "react";
import {
  getUser,
  getUserForId,
  createUser,
  updateUser,
  activarUser,
  desactivarUser,
  loginUser,
  updatePasswordUser,
} from "../api/api.users";
import ModalMessage from "../nextui/ModalMessage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([])
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [idUser, setIdUser] = useState([])
  const [onClose, setOnClose] = useState(false)

  const getUsers = async () => {
    try {
      const response = await getUser();
      setUsers(response.data.data);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }

  const getUserID = async (id) => {
    try {
      const response = await getUserForId(id)
      setUser(response.data.data[0]);
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
      if(response.status === 200) {
        setOnClose(true)
      }
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

  const updatePassword = async (id, data) => {
    try {
      const response = await updatePasswordUser(id, data)
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

  const logout = () => {
    try {
      localStorage.clear();
      setIsAuthenticated(false)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        users,
        errors,
        idUser,
        user,
        onClose,
        logout,
        setUser,
        setIdUser,
        getUserID,
        setIsAuthenticated,
        loginUsers,
        getUsers,
        createUsers,
        updatePassword,
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

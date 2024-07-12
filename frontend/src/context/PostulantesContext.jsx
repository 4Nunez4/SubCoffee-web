import React, { createContext, useContext, useEffect, useState } from "react";
import {
  UpdatePostulanteActivar,
  UpdatePostulanteDesact,
  createPostulantes,
  getPostulante,
  getPostulantes,
  getPostulantesActivos,
} from "../api/api.postulantes";
import ModalMessage from "../nextui/ModalMessage";

const PostulantesContext = createContext();

export const usePostulantesContext = () => {
  const context = useContext(PostulantesContext);
  if (!context) {
    throw new Error("Debes usar DeparProvider en el App");
  }
  return context;
};

export const PostulantesProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [idPosts, setIdPost] = useState(0);

  const [postsActivos, setPostsActivos] = useState([]);
  const [cerrarModal, setCerrarModal] = useState(false);

  const getPosts = async (id) => {
    try {
      const res = await getPostulantes(id);
      setPosts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsActivos = async (id) => {
    try {
      const res = await getPostulantesActivos(id);
      setPostsActivos(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    try {
      const res = await getPostulante(id);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPosts = async (datos, id) => {
    try {
      const responsee = await createPostulantes(datos);
      if (responsee.status === 200) {
        getPosts(id);
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarPosts = async (datos, idSub) => {
    try {
      await UpdatePostulanteDesact(datos);
      getPosts(idSub);
    } catch (error) {
      console.log(error);
    }
  };

  const activarPosts = async (id, idSub) => {
    try {
      await UpdatePostulanteActivar(id);
      getPosts(idSub);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <PostulantesContext.Provider
      value={{
        errors,
        posts,
        idPosts,
        setIdPost,
        setPosts,
        getPosts,
        getPost,
        createPosts,
        desactivarPosts,
        activarPosts,

        getPostsActivos,
        postsActivos,
        cerrarModal,
        setCerrarModal,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </PostulantesContext.Provider>
  );
};

export default PostulantesContext;

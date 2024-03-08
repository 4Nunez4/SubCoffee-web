
import React,{ useState,useEffect } from 'react'
import axios from "axios";

const baseURL = "http://localhost:4000/finca/buscar/2";

export default function Axios() {
    const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      <h1>Nombre: {post.nombre_fin}</h1>
      <p>Ubicacion: {post.ubicacion_fin}</p>
      <p>imagen: {post.imagen_fin}</p>
      <p>Dscripcion: {post.descripcion_fin}</p>
      <p>Departamento: {post.departamento_fin}</p>
      <p>Municipio: {post.municipio_fin}</p>
      <p>cedula: {post.fk_id_usuario}</p>
    </div>
  );
}




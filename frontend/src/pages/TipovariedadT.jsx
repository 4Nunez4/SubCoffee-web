import React, { useState, useEffect } from "react";
import axiosClient from "../api/axios";
import toast from "react-hot-toast";
import TipoVariedadTable from "../components/Guard/TipoVaridadTable.jsx";
import FormTipovariedadOrganism from "../components/organisms/FormTipovariedadOrganism.jsx"

export function TipoVariedadT() {
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [initialData, setInitialData] = useState(null);
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchVariedadList();
    }, []);

    const fetchVariedadList = async () => {
        try {
            const response = await axiosClient.get("/v1/tipo_vari");
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching tipo de variedades list:", error);
        }
    };

    const peticionDesactivar = async (pk_id_tipo_vari) => {
        try {
            const response = await axiosClient.put(`/v1/tipo_vari/${pk_id_tipo_vari}`);
            if (response.status === 200) {
                toast.success(response.data.message);
                fetchVariedadList(); 
            }
        } catch (error) {
            toast.error("Error en el sistema " + error);
        }
    };

    const peticionActivar = async (pk_id_tipo_vari) => {
        try {
            const response = await axiosClient.put(`/v1/tipo_vari/${pk_id_tipo_vari}`);
            if (response.status === 200) {
                toast.success(response.data.message);
                fetchVariedadList(); 
            }
        } catch (error) {
            toast.error("Error en el sistema " + error);
        }
    };

    const contenido = [
        { uid: "pk_id_tipo_vari", name: "Codigo Variedad", sortable: true },
        { uid: "nombre_tipo_vari", name: "Nombre Variedad", sortable: true },
        { uid: "estado_tipo_vari", name: "Estado variedad", sortable: true },
        { uid: "actions", name: "Acciones", sortable: false },
    ];

        const id =localStorage.getItem('idUser')

    const handleSubmit = async (data, e) => {
        e.preventDefault();
        try {
            const response = mode === "create"
                ? await axiosClient.post("/v1/tipo_vari", data)
                : await axiosClient.put(`/v1/tipo_vari/${initialData.pk_id_tipo_vari}`, data);

                const message = response.data.message;

            if (response.status === 200) {
                toast.success(message);
                setModalOpen(false);
                fetchVariedadList(); // Actualizar la lista de departamentos después de crear o actualizar
            }
            else {
                toast.error(message);
            }
        } catch (error) {
            console.error("Error en el servidor:", error);
            toast.error("Error en el servidor");
        }
    };

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData);
        setModalOpen(true);
        setMode(mode);
    };

    return (
        <div className="w-full flex flex-col items-center px-10">
            <FormTipovariedadOrganism
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={mode === "create" ? "Registrar Tipo Variedad" : "Actualizar Tipo Variedad"}
                actionLabel={mode === "create" ? "Registrar" : "Actualizar"}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
            />
            <TipoVariedadTable
                actualizar={() => handleToggle("update", id)}
                registrar={() => handleToggle("create")}
                desactivar={peticionDesactivar}
                activar={peticionActivar}
                data={contenido}
                results={results}
            />
        </div>
    );
}
export default TipoVariedadT;


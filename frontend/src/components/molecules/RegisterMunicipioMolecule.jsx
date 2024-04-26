import { useEffect, useRef, useState } from "react";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { SelectorIcon } from "../../nextui/SelectorIcon";
import { icono } from "../atoms/IconsAtom";
import axiosClient from "../../api/axios";

const RegisterMunicipioMolecule = ({
  mode,
  initialData,
  handleSubmit,
  actionLabel,
}) => {
  const codigoMunicipioRef = useRef(null);
  const nombreMunicipioRef = useRef(null);
  const [departamentoIdRef, setDepartamentoIdRef] = useState("");
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axiosClient.get("/v1/departamentos");
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error fetching departamentos:", error);
        toast.error("Error al cargar la lista de departamentos");
      }
    };

    fetchDepartamentos();
    if (mode === "update" && initialData) {
      try {
        console.log(initialData);
        codigoMunicipioRef.current.value = initialData.pk_codigo_muni;
        nombreMunicipioRef.current.value = initialData.nombre_muni;
        setDepartamentoIdRef(initialData.fk_departamento);
      } catch (error) {
        console.error("Error fetching departamento data:", error);
        toast.error("Error al cargar datos del municipio");
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        pk_codigo_muni: codigoMunicipioRef.current.value,
        nombre_muni: nombreMunicipioRef.current.value,
        fk_departamento: departamentoIdRef,
      };
      handleSubmit(data, e);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error en el servidor " + error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {mode === "update" ? "Actualizar Municipio" : "Registrar Municipio"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Codigo del Municipio"
        required
        ref={codigoMunicipioRef}
      />
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre del Municipio"
        required
        ref={nombreMunicipioRef}
      />
      <Select
        label="Departamento"
        className="max-w-sm"
        variant="bordered"
        popoverProps={{
          classNames: {
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-background",
          },
        }}
        value={departamentoIdRef}
        onChange={(e) => setDepartamentoIdRef(e.target.value)}
      >
        {departamentos.map((departamento) => (
          <SelectItem
          key={departamento.pk_codigo_depar}
          value={departamento.pk_codigo_depar}
          >
            {departamento.nombre_depar}
          </SelectItem>
        ))}
      </Select>
      <center>
        <Button type="submit" color="primary">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterMunicipioMolecule;

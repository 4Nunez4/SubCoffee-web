import { useEffect, useRef, useState } from "react";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { SelectorIcon } from "../../nextui/SelectorIcon";
import { icono } from "../atoms/IconsAtom";
import axiosClient from "../../api/axios";

const RegisterVeredaMolecule = ({
  mode,
  initialData,
  handleSubmit,
  actionLabel,
}) => {
  const codigoVeredaRef = useRef(null);
  const nombreVeredaRef = useRef(null);
  const [municipioIdRef, setmunicipioIdRef] = useState("");
  const [municipios, setmunicipios] = useState([]);

  useEffect(() => {
    const fetchmunicipios = async () => {
      try {
        const response = await axiosClient.get("/v1/municipios");
        setmunicipios(response.data);
      } catch (error) {
        console.error("Error fetching municipios:", error);
        toast.error("Error al cargar la lista de municipios");
      }
    };

    fetchmunicipios();
    if (mode === "update" && initialData) {
      try {
        console.log(initialData);
        codigoVeredaRef.current.value = initialData.pk_id_vere;
        nombreVeredaRef.current.value = initialData.nombre_vere;
        setmunicipioIdRef(initialData.fk_municipio);
      } catch (error) {
        console.error("Error fetching municipio data:", error);
        toast.error("Error al cargar datos del Vereda");
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        pk_id_vere: codigoVeredaRef.current.value,
        nombre_vere
        : nombreVeredaRef.current.value,
        fk_municipio: municipioIdRef,
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
        {mode === "update" ? "Actualizar Vereda" : "Registrar Vereda"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Codigo del Vereda"
        required
        ref={codigoVeredaRef}
      />
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre del Vereda"
        required
        ref={nombreVeredaRef}
      />
      <Select
        label="municipio"
        className="max-w-sm border border-gray-200 rounded-lg"
        variant="bordered"
        popoverProps={{
          classNames: {
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-background",
          },
        }}
        value={municipioIdRef}
        onChange={(e) => setmunicipioIdRef(e.target.value)}
      >
        {municipios.map((municipio) => (
          <SelectItem
          key={municipio.pk_codigo_muni}
          value={municipio.pk_codigo_muni}
          >
            {municipio.nombre_depar}
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

export default RegisterVeredaMolecule;

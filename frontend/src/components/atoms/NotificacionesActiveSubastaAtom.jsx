import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios";
const navigate = useNavigate()
const { getSubs, subastas } = useContext(SubastaContext)



const { getSubForUser, subastaForuser, desactivarSubs, activarSubs, setIdSubasta } = useContext(SubastaContext)
const usuario = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  getSubForUser(usuario.pk_cedula_user)
}, []);


useEffect(() => {
    getSubs();
}, []);
const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("empieza a ofertar ya en la subasta de {} ");
    setTexto("");
};
<form onSubmit={handleSubmit} className="flex flex-col space-y-2">
    <Input
        startContent={<icono.iconoGmail />}
        name="text"
        variant="bordered"
        label=""
        aria-label="Duda o sugerencia..."
        placeholder="Duda o sugerencia..."
        required={true}
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
    />
    <Button onSubmit={handleSubmit} className="bg-gray-400 text-white hover:bg-gray-500 w-full rounded-lg">
        Enviar duda
    </Button>
    <Button
        className="bg-gray-100 text-foreground border-default-200"
        radius="md"
        variant="bordered"
        size="sm"
        onPress={() => navigate(`/profile/${subasta.pk_cedula_user}`)}
    >
        Visualizar perfil
    </Button>
    <Button className="bg-gray-400" radius="md" size="lg" onPress={() => navigate(`/subasta/${subasta.pk_id_sub}`)}>
        Visualizar Subasta
    </Button>
</form>

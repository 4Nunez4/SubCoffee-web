import react from "React"
import { FaX } from "react-icons/fa6";

function IconFax({onClose}) {
    return(
        <div>
            <Fax className="cursor-pointer" onClick={onClose} />
        </div>
    )
}

export default IconFax
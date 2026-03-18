
import { useContext } from "react"; //el chip para poder recibir ondas de radio
import PacientesContext from "../context/PacientesProvider"; //estacion favorita ya seleccionada


//ya se entrega la estacion sintonizada automaticamnte a los components
const usePacientes = () => {
    
    return useContext(PacientesContext); //selecciona la estacion de radio
}
//con solo importar el hook ya todos escuchan esta estacion automáticamnte

export default usePacientes;
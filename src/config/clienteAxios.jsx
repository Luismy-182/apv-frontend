import axios from "axios";

//create es un metodo de axios crea una URL de base
const clienteAxios=axios.create({
    //endpoint principal al backend
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios;
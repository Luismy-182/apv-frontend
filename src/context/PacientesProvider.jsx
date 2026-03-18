import { createContext, useState, useEffect, Children, useEffectEvent } from 'react';
//defines un context, ejemplo con radios
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';


const PacientesContext = createContext(); //defines tu frecuencia de radio con el gobierno, estación

//ANTENA. defines el pacientesProvider, es la cabina de radio
const PacientesProvider = ({ children }) => { //children es el publico (componentes) y todos los que esten dentro del provider nos escucharan

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const {auth}=useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const url = "/pacientes";

                const { data } = await clienteAxios(url, config);
                //metemos el resultado de la consulta al state
                setPacientes(data);

            } catch (error) {
                console.log(error);

            }
        }
        obtenerPacientes();
    }, [auth]);


    const guardarPaciente = async (paciente) => {

        if (paciente.id) {
            //ya existe el ID, editando
            const url = `/pacientes/${paciente.id}`;
            const token = localStorage.getItem('token');
            const config = {
                //autentificacion
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {

                const { data } = await clienteAxios.put(url, paciente, config)

                console.log(data);

                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState
                );

                setPacientes(pacienteActualizado)

            } catch (error) {
                console.log(error);

            }


        } else {
            //id nuevo, insertamos

            //al hacer submit al formulario nos sale todo el objeto de usuario
            console.log(paciente);
            //insertamos en la BD
            try {
                const url = "/pacientes";
                const token = localStorage.getItem('token');
                const config = {
                    //autentificacion
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.post(url, paciente, config);
                //creando un nuevo objeto con destructuring y operador REST
                const { createdAt, updateAt, __v, ...pacienteAlmacenado } = data;

                setPacientes([pacienteAlmacenado, ...pacientes]);

            } catch (error) {
                console.log(error.response.data.msg);

            }

        }



    }
    //editar pacientes
    const setEdicion = (paciente) => {
        setPaciente(paciente);

    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm("¿confirmas que deseas eliminar el paciente?");

        if (confirmar) {
            try {
                const url = `/pacientes/${id}`;
                const token = localStorage.getItem('token');
                const config = {
                    //autentificacion
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(url, config);
                //actualiza el state de paciente 
                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);

                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error);

            }
        }




    }

    return (
        <PacientesContext.Provider //Esto es el botón de "AL AIRE". Todo lo que pongas dentro de estas etiquetas se empezará a transmitir a los children.

            //value viene siendo el microfono, todo lo que dice por la radio 
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        //si value={{ nombre: "Juan" }}, ¡pum!, todos los alumnos con un radio encendido escucharán "Juan" al mismo tiempo.
        >
            {children}
        </PacientesContext.Provider>
    )
}


export {
    PacientesProvider
}

export default PacientesContext;
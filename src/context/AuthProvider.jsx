import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    //cuando el componente se ejecuta el codigo
    useEffect(() => {
        const autentificarUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false);
                return;
            }
            const url = '/veterinarios/perfil'

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios(url, config)

                setAuth(data.perfil);
                //si solo dejas data y no extraes el objeto perfil no lee el objeto y al recargar la página te saca de la sesion
                //console.log(data.perfil);

            } catch (error) {
                console.log(error.response.data.msg);
                console.log(error);

                setAuth({});
            }

            setCargando(false);

        }
        autentificarUsuario();
    }, []);

    const actualizarPerfil = async datos => {
        const url = `/veterinarios/perfil/${datos._id}`
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await clienteAxios.put(url, datos, config);
            console.log(data);
            return {
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }

        }

    }

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({})
    }

    const guardarPassword = async (datos) => {
        const url = `/veterinarios/actualizar-password`;
        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(url, datos, config);
            console.log(data);

            return {
                msg:data.msg
            }
        } catch (error) {
            console.log(error.response.data.msg);
            return {
                msg:error.response.data.msg,
                error:true
            }
        }

    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export {
    AuthProvider
}
export default AuthContext;
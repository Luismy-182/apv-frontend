import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Alertas from "../components/Alertas";
import clienteAxios from "../config/clienteAxios";

function NuevoPassword() {
  const params = useParams();
  const { token } = params;
  const [password, setPassword] = useState('');
  const [alertas, setAlertas] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  // const [cargando, setCargando]=useState(true);


  //verifica si el token es correcto
  useEffect(() => {
    const validarToken = async () => {
      try {
        const url = `/veterinarios/olvide-password/${token}`;

        await clienteAxios(url)

        setAlertas({
          msg: 'Escribe tu nuevo password'
        });
        setTokenValido(true);

      } catch (error) {
        setAlertas({
          msg: 'Error con el token o enlace',
          error: true
        });

      }
    }

    validarToken();

  }, []);

  const { msg } = alertas;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password < 4) {
      setAlertas({
        msg: 'El password debe ser mayor a 6 caracteres'
      })
      return;
    }
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      console.log(data);
      setAlertas({
        msg: data.msg
      })
      setPasswordModificado(true);
    } catch (error) {
      setAlertas({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  return (
    <>
      <div className="">
        <h1 className='text-indigo-600 font-black text-6xl'>Restablece tu password y no pierdas acceso a tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>


      <div className="bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {/* Agregamos el componente y le pasammos la info vía props, operador AND condicional, a diferencia del ternario no necesitas pasarle nada si es falso*/}
        {

          msg && <Alertas
            alerta={alertas}
          />
        }

        {
          //if tokenValido=true
          tokenValido && (
            <form onSubmit={handleSubmit}>
              <div className='my-5'>
                <label className="block uppercase text-gray-600 text-xl font-bold">
                  Password
                </label>
                <input type="password" placeholder='Tu password' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <input type="submit" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' value="Registrarse" />
            </form>

          )

        }
        {
          passwordModificado && <nav className='mt-10 lg:flex lg:justify-between'>
            <Link className='block text-center text-gray-500' to="/">¿Ya tienes una cuenta? Iniciar Sesión</Link>
          </nav>
        }
      </div>




    </>
  )
}

export default NuevoPassword   
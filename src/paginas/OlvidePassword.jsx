import { Link } from "react-router-dom";
import { useState } from "react";
import Alertas from '../components/Alertas';
import clienteAxios from '../config/clienteAxios';

const OlvidePassword = () => {
  //usamos state para rastrear el estado del email
  const [email, setEmail]=useState('');
  //state para alertas
  const [alertas, setAlertas]=useState({});

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!email  || email.length<4){
      setAlertas({
        msg: 'El Email es obligatorio',
        error:true
      })
      return;
    }
    //mandando el token
    try {
      const url=`/veterinarios/olvide-password`
      const {data}= await clienteAxios.post(url, {
        email
      });

      setAlertas({
        msg: data.msg
      });
      
    } catch (error) {
      setAlertas({
        msg: error.response.data.msg,
        error:true
      });
    }

  }

  const {msg}=alertas;
  return (
    <>
      <div className="">
        <h1 className='text-indigo-600 font-black text-6xl'>Recupera tu acceso y no pierdas tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>

      <div className="bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {
          msg && <Alertas 
              alerta={alertas}
            />
        }

        <form action=""
        onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Email
            </label>
            <input type="email" placeholder='Email de registro' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
            value={email}
            onChange={e=>setEmail(e.target.value)}
            
            />
          </div>

          <input type="submit" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' value="Recuperar password" />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link className='block text-center text-gray-500' to="/">Ya tienes una cuenta? Inicia Sesión</Link>
          <Link className='block text-center text-gray-500' to="/registrar">¿No tienes una cuenta? Registrate</Link>
        </nav>
      </div>
    </>
  )

}

export default OlvidePassword
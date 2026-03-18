import { Link, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react';
import Alertas from '../components/Alertas';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertas, setAlertas] = useState({});
  const {setAuth}=useAuth();
  const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlertas({ msg: 'error, llena todos los campos', error: true });
      return;
    }

    try {
      const url=`/veterinarios/login`;
      const {data}= await clienteAxios.post(url,{email, password});
      localStorage.setItem('token', data.token);
      setAuth(data);
      
      //se usa navigate para ir a otra ruta de tu router con react
      navigate('/admin');
    } catch (error) {   
      setAlertas({
        msg: error.response.data.msg,
        error:true
      });
    }

  }
  const { msg } = alertas;
  
  


  return (
    <>
      <div className="">
        <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesion y Administra tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>

      <div className="bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {
            msg && <Alertas
            alertas={alertas}
          />

        
        }
        <form action="" onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Email
            </label>
            <input type="email" placeholder='Email de registro' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='my-5'>
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Password
            </label>
            <input type="password" placeholder='Tu password' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password} onChange={(e) => setPassword(e.target.value)}

            />
          </div>

          <input type="submit" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' value="Iniciar Sesión" />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link className='block text-center text-gray-500' to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link className='block text-center text-gray-500' to="/olvide-password">Olvide mi Password</Link>

        </nav>
      </div>
    </>
  )
}

export default Login
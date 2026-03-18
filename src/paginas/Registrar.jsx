import { Link } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/clienteAxios';
import Alertas from '../components/Alertas';

const Registrar = () => {
  //definiendo el State
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alertas, setAlertas] = useState({});


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlertas({ msg: 'Todos los campos son obligatorios', error: true });

      return;
    }
    if (password !== repetirPassword) {
      setAlertas({ msg: 'Los passwords no coinciden', error: true });
      return;
    }
    if (password.length < 4) {
      setAlertas({ msg: 'Password muy corto, agrega minimo 4 caracteres', error: true });
      return;
    }
    //restablece el objeto de alertas a '' ya que paso todas las validaciones.
    setAlertas({});

    //mandando al backend con axios en lugar de fetch API
    try {
      const url="/veterinarios";
      await clienteAxios.post(url, {nombre, email, password});
      setAlertas({
        msg:'Exito, usuario registrado correctamente, revisa tu email', 
        error:false
      });
      
    } catch (error) {
      console.log(error);
      
      setAlertas({
        msg:error.response.data.msg,
        error:true
      })
      
      
    } 

  }
  const { msg } = alertas;
  return (
    <>
      <div className="">
        <h1 className='text-indigo-600 font-black text-6xl'>Crear tu cuenta y Administra tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>


      <div className="bg-white mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {/* Agregamos el componente y le pasammos la info vía props, operador AND condicional, a diferencia del ternario no necesitas pasarle nada si es falso*/}
        {

          msg && <Alertas
            alerta={alertas}
          />
        }
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Nombre
            </label>
            <input type="text" placeholder='Tu nombre' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Email
            </label>
            <input type="email" placeholder='Email de registro' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>



          <div className='my-5'>
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Password
            </label>
            <input type="password" placeholder='Tu password' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Repite tu password
            </label>
            <input type="password" placeholder='Tu Repite tu password' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>


          <input type="submit" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' value="Registrarse" />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center text-gray-500' to="/">¿Ya tienes una cuenta? Iniciar Sesión</Link>
          <Link className='block text-center text-gray-500' to="/olvide-password">Olvide mi Password</Link>

        </nav>
      </div>

    </>
  )
}

export default Registrar
import React from 'react'
import AdminNav from '../components/AdminNav'
import Alertas from '../components/Alertas'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth' 
const CambiarPassword = () => {
  const [alertas, setAlertas] = useState({});
  const [password, setPassword] = useState({
    pwd_actual:'',
    pwd_nuevo:''
  });

  const {guardarPassword}=useAuth({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(password).some(campo => campo === '')) {
      setAlertas({
        msg: 'Todos los campos son Obligatorios',
        error:true
      });
      return;
    }
    if(password.pwd_nuevo.length<6){
      setAlertas({
        msg:'Debe tener el password almenos 6 caracteres',
        error:true
      })
      return;
    }

    const respuesta=await guardarPassword(password);
    setAlertas(respuesta);
  }

  const { msg } = alertas;
  return (
    <div>
      <AdminNav />

      <h2
        className='font-black text-3xl text-center mt-10'
      >Cambiar Password</h2>

      <p className='text-xl mt-5 mb-10 text-center'>
        Modifica tu <span className=' text-indigo-600 font-bold'>Password Aquí</span>
      </p>


      <div className="flex justify-center ">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alertas
            alertas={alertas}
          />}
          <form action=""
            onSubmit={handleSubmit}
          >

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">Password</label>
              <input type="text"
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'

                placeholder='Escribe tu password Actual'
                name="pwd_actual"

                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}

              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">Nuevo Password</label>
              <input type="text"
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                name="pwd_nuevo"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
                placeholder='Escribe tu password nuevo'

              />
            </div>






            <input
              className='bg-indigo-600 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-700'
              type="submit" value="Actualizar Password" />
          </form>
        </div>

      </div>
    </div>
  )
}

export default CambiarPassword
import React, { useState } from 'react'
import Alertas from './Alertas';
import usePacientes from "../hooks/usePacientes";
import { useEffect } from 'react';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState(Date.now());
  const [sintomas, setSintomas] = useState('');
  const [alertas, setAlertas] = useState({});

  const [id, setId] = useState(null);

  //entregando el aparato receptor pacientes al formulario, extraemos el paciente a editar
  const { pacientes, guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    //espia el componente al iniciar
    //console.log('render o cambio paciente');

    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }

  }, [paciente]);





  const [alerta, setAlerta] = useState({});
  //validando el formulario
  const handleSubmit = e => {
    e.preventDefault();


    //validacion
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlertas({
        msg: 'Todos los campos obligatorios',
        error: true
      });
      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });

    setAlertas({
      msg: "Guardado Correctamente"
    });

    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId('');

  }

  //extraemos el mensaje de alertas si existe algo
  const { msg } = alertas;




  return (
    <>
      <h2 className='font-black text-3xl text-center'>Administrador de pacientes</h2>
      <p className='text-xl mt-5 mb-10 text-center'>Añade a tus pacientes y <span className='text-indigo-600 font-bold'>administralos</span>
      </p>
      {
        msg && <Alertas
          alertas={alertas}
        />
      }
      <form className='bg-white pb-5 px-5 mb-10 lg:mb-0 shadow-md rounded-md pt-5'
        onSubmit={handleSubmit}
      >
        <div className="mb-5">

          <label htmlFor="nombre" >Nombre mascota</label>
          <input
            id='nombre'
            type="text"
            placeholder='Nombre de la mascota'
            className='border-2 border-gray-300  w-full p-2 mt-2  rounded-md placeholder-gray-400 '
            value={nombre}
            onChange={e => setNombre(e.target.value)}

          />
        </div>
        <div className="mb-5">

          <label htmlFor="propietario">Nombre del propietario</label>
          <input
            id='propietario'
            type="text"
            placeholder='Nombre del propietario'
            className='border-2 w-full p-2 mt-2 border-gray-300   rounded-md placeholder-gray-600'
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">

          <label htmlFor="email">Email del propietario</label>
          <input
            id='email'
            type="text"
            placeholder='Email del propietario'
            className='border-2 w-full p-2 mt-2 border-gray-300  rounded-md placeholder-gray-400 '
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">


          <label htmlFor="fecha">Fecha de alta</label>
          <input
            id='fecha'
            type="date"

            className='border-2 w-full p-2 mt-2 border-gray-300  rounded-md placeholder-gray-400 '
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">


          <label htmlFor="sintomas">Sintomas</label>
          <textarea
            id='sintomas'
            placeholder='Describe los sintomas'
            className='border-2 w-full p-2 my-2 border-gray-300  rounded-md placeholder-gray-400 '

            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>


        <input type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'} className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors mt-5' />
      </form>


    </>
  )
}

export default Formulario
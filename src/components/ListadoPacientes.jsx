import React from 'react'
import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente';

function ListadoPacientes() {

  const { pacientes } = usePacientes();
  
  

  return (
    <>
      {pacientes.length ?
        (
          <>
            <div className='font-black text-3xl text-center'>Listado pacientes</div>
            <p className='text-xl mt-5 mb-10 text-center'>Administra tus
              <span className='text-indigo-600 font-bold '> pacientes y citas</span>

            </p>

            { 
            pacientes.map(paciente => (
             <Paciente key={paciente._id} paciente={paciente}/>)
            ) 
            }
          </>

        )

        :
        (
          <>
            <div className='font-black text-3xl text-center'>No hay pacientes</div>
            <p className='text-xl mt-5 mb-10 text-center'>Comienza a agregar pacientes
              <span className='text-indigo-600 font-bold '> Y apareceran en este lugar</span>

            </p>
          </>

        )}


    </>

  )
}

export default ListadoPacientes
import React from 'react'

function Alertas({alertas}) {
//componente para mostrar alertass, recibimos el objeto y mostramos sus mensajes

    return (
    <>
    <div className={`${alertas.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-5`}>

        {alertas.msg}
    </div>
    </>
  )
}

export default Alertas
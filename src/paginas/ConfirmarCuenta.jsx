import clienteAxios from '../config/clienteAxios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Alertas from '../components/Alertas';

const ConfirmarCuenta = () => {



//leemos parametros de la url
const params=useParams()
const {token}=params;

//administramos el state 
const [cuentaConfirmada, setCuentaConfirmada]=useState(false);
const [cargando, setCargando]=useState(true);


const [alertas, setAlertas]=useState({});

useEffect(()=>{
  const confirmarCuenta =async () => {
    try {
      const url=`/veterinarios/confirmar-cuenta/${token}`;
      
      //axios siempre da un objeto data
      const {data}=await clienteAxios(url);

      setCuentaConfirmada(true)
      setAlertas({
        msg:data.msg
      });
      console.log(data);
      
    } catch (error) {
      setAlertas({
        msg:error.response.data.msg,
        error:true
    });

    }
    setCargando(false);
  }
  confirmarCuenta();
},[]);

  return (
    <>
     <div className="">
        <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu Cuenta y Comienza a Administrar tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>
      <div className="">
        {!cargando &&
        <Alertas
          alerta={alertas}
          />
        }

        {
          cuentaConfirmada && 
            <Link className='block text-center my-5 text-gray-500'
            to="/">Iniciar Sesión</Link>
          
        }
      </div>

    
    </>
  )
}

export default ConfirmarCuenta
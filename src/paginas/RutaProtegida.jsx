import { Navigate, Outlet } from "react-router-dom";

import React from 'react'
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RutaProtegida() {
  const { auth, cargando } = useAuth();
  if (cargando) return 'cargando..';
  //console.log(auth);

  return (
    <>

      <Header />
      {auth._id ? (
        <main className="container mx-auto mt-5">
          <Outlet />
        </main>
      ) : <Navigate to="/" />}
      <Footer />
    </>
  )
}

export default RutaProtegida
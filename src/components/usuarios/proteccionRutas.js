import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProteccionRuta = ({ element }) => {
  // Verifica si el usuario tiene un token almacenado en las cookies
  const token = Cookies.get('token');

  // Si hay un token, permite el acceso al componente protegido
  return token ? element : <Navigate to="/ingreso" />;
};

export default ProteccionRuta;
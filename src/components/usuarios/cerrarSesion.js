import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CerrarSesionButton = () => {
    const navigate = useNavigate();
  const cerrarSesion = () => {
    Cookies.remove('token');
    navigate('/ingreso');
  };

  return (
    <div className="container mt-3">
      <button
        className="btn btn-danger"
        onClick={cerrarSesion}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default CerrarSesionButton;
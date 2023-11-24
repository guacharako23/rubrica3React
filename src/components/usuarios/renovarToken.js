import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const RenovarTokenButton = () => {
  const [tokenRenovado, setTokenRenovado] = useState(false);

  const renovarToken = async () => {
    try {
      const response = await axios.post('https://rubrica-ultima.onrender.com/r/renovar-token');
      const nuevoToken = response.data.token;
      Cookies.set('token', nuevoToken);
      setTokenRenovado(true);
    } catch (error) {
      console.error('Error al renovar el token:', error);
    }
  };

   

  return (
    <div className="container mt-3">
      <button
        className="btn btn-primary"
        onClick={renovarToken}
        
      >
        Renovar Token
      </button>
    </div>
  );
};

export default RenovarTokenButton;
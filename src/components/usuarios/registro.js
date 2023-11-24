import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegistroComponent = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('asesor'); // Valor por defecto, puedes cambiarlo según tus necesidades
  const navigate = useNavigate();
  const handleRegistro = async () => {
    try {
       const response = await axios.post('https://rubrica-ultima.onrender.com/r/registro', {
         correo,
         contraseña,
         rol,
       });
       // Realiza acciones adicionales después del registro si es necesario
       // ...
       if (response.status === 200) {
        // Registro exitoso
        console.log('Registro exitoso:', response.data);
  
        // Puedes realizar acciones adicionales después del registro si es necesario
        // Por ejemplo, redirigir al usuario a la página de inicio de sesión
        
        navigate('/ingreso');
        // Maneja otros casos de respuesta del servidor
      }

     } catch (error) {
       console.error('Error de registro:', error);
     }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <div className="mb-3">
        <label htmlFor="correo" className="form-label">Correo:</label>
        <input type="text" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="contraseña" className="form-label">Contraseña:</label>
        <input type="password" className="form-control" id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="rol" className="form-label">Rol:</label>
        <select className="form-select" id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="administrador">Administrador</option>
          <option value="asesor">Asesor</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleRegistro}>Registrarse</button>
    </div>
  );
};

export default RegistroComponent;


import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';



const IngresoComponent = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    function getCookie(name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    const handleLogin = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post('https://rubrica-ultima.onrender.com/r/ingreso', {
                correo,
                contraseña,

            }, {
                withCredentials: true
            },);
            console.log(correo);
            console.log(contraseña);
            const cookies = document.cookie;
            const token = response.data.token;
            await new Promise((resolve) => setTimeout(resolve, 100));
            

            console.log(cookies);
            if (response.status === 200) {

                setCookie('token', token, 1);
                console.log(token);

                const usuario = jwtDecode(token);

                if (token) {

                    switch (usuario.rol) {
                        case 'administrador':
                            navigate('/productos');
                            break;
                        case 'asesor':
                            navigate('/ventas');
                            break;
                        default:
                            console.error('Rol no reconocido');
                            break;
                    }

                } else {
                    // Maneja el caso en el que no se recibe un token
                    console.error('Error de inicio de sesión: No se recibió un token en la respuesta');
                }
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
        }

    };

    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión</h2>
            <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo:</label>
                <input type="text" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="contraseña" className="form-label">Contraseña:</label>
                <input type="password" className="form-control" id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
};

export default IngresoComponent;


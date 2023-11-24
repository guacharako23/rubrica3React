import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import RenovarTokenButton from '../usuarios/renovarToken';
import CerrarSesionButton from '../usuarios/cerrarSesion';


function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const ListaVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [editingVentaId, setEditingVentaId] = useState(null);
    const [creating, setCreating] = useState(false);
    const [editedVentaData, setEditedVentaData] = useState({
        Codigo_producto: '',
        Nombre_cliente: '',
        Telefono_cliente: '',
        Fecha_venta: '',
        Cantidad_vendida: '',
        Total_venta: '',

    });
    const [newVentaData, setNewVentaData] = useState({
        Codigo_producto: '',
        Nombre_cliente: '',
        Telefono_cliente: '',
        Fecha_venta: '',
        Cantidad_vendida: '',
        Total_venta: '',
    });


    const obtenerVentas = async () => {
        try {
          // Obtén el token de las cookies
          const token = getCookie('token');
      
          // Configura las cabeceras para incluir el token
          const headers = {
            Authorization: `Bearer ${token}`,
          };
      
          // Realiza la solicitud con axios y las cabeceras configuradas
          const response = await axios.get('https://rubrica-ultima.onrender.com/api/ventas/', { headers }, {
            withCredentials: true,
          });
      
          // Maneja la respuesta
          setVentas(response.data);
        } catch (error) {
          console.error('Error en la solicitud de ventas:', error);
      
          // Puedes manejar el error de autenticación aquí, por ejemplo, redirigir a la página de inicio de sesión
          // o mostrar un mensaje al usuario.
        }
      };
      
      useEffect(() => {
        obtenerVentas();
      }, []);

    const handleEliminarVenta = async (codigo) => {
        // Send a DELETE request to the backend
        try {
            await axios.delete(`https://rubrica-ultima.onrender.com/api/ventas/${codigo}`);
            // Update the venta list after deletion
            const updatedVentas = ventas.filter(venta => venta.Codigo !== codigo);
            setVentas(updatedVentas);
        } catch (error) {
            console.error('Error deleting venta:', error);
        }
    };

    const handleEditarVenta = (venta) => {
        setEditingVentaId(venta.Codigo);
        setEditedVentaData({
            Codigo_producto: venta.Codigo_producto,
            Nombre_cliente: venta.Nombre_cliente,
            Telefono_cliente: venta.Telefono_cliente,
            Fecha_venta: venta.Fecha_venta,
            Cantidad_vendida: venta.Cantidad_vendida,
            Total_venta: venta.Total_venta,
        });
    };

    const handleSaveEdit = async () => {
        try {
            await axios.patch(`https://rubrica-ultima.onrender.com/api/ventas/${editingVentaId}`, editedVentaData);
            // Actualiza la lista de ventas después de la edición
            const updatedVentas = ventas.map(venta => (venta.Codigo === editingVentaId ? { ...venta, ...editedVentaData } : venta));
            setVentas(updatedVentas);
            // Restaura los valores de edición
            setEditingVentaId(null);
            setEditedVentaData({
                Codigo_producto: '',
                Nombre_cliente: '',
                Telefono_cliente: '',
                Fecha_venta: '',
                Cantidad_vendida: '',
                Total_venta: '',
            });
        } catch (error) {
            console.error('Error al editar venta:', error);
        }
    };
    const handleCreateVenta = async () => {
        try {
            // Enviar una solicitud POST al servidor con la información del nuevo venta
            const response = await axios.post('https://rubrica-ultima.onrender.com/api/ventas', newVentaData);

            // Actualizar la lista de ventas con el nuevo venta creado
            setVentas([...ventas, response.data]);

            // Restaurar el estado para ocultar el formulario de creación
            setCreating(false);

            // Restaurar el estado del nuevo venta
            setNewVentaData({
                Codigo_producto: '',
                Nombre_cliente: '',
                Telefono_cliente: '',
                Fecha_venta: '',
                Cantidad_vendida: '',
                Total_venta: '',
            });
            obtenerVentas();
        } catch (error) {
            console.error('Error al crear venta:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Ventas</h2>
            <button className="btn btn-primary" onClick={() => setCreating(true)}>Presione para crear</button>
            <RenovarTokenButton></RenovarTokenButton>
            <CerrarSesionButton></CerrarSesionButton> 
            {creating && (
                // Formulario de Creación
                <div>
                    <div className="form-group">
                        <label htmlFor="Codigo_producto">Código Producto</label>
                        <input type="number" className="form-control" id="Codigo_producto" value={newVentaData.Codigo_producto} onChange={(e) => setNewVentaData({ ...newVentaData, Codigo_producto: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Nombre_cliente">Nombre Cliente</label>
                        <input type="text" className="form-control" id="Nombre_cliente" value={newVentaData.Nombre_cliente} onChange={(e) => setNewVentaData({ ...newVentaData, Nombre_cliente: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Telefono_cliente">Teléfono Cliente</label>
                        <input type="text" className="form-control" id="Telefono_cliente" value={newVentaData.Telefono_cliente} onChange={(e) => setNewVentaData({ ...newVentaData, Telefono_cliente: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Fecha_venta">Fecha Venta</label>
                        <input type="date" className="form-control" id="Fecha_venta" value={newVentaData.Fecha_venta} onChange={(e) => setNewVentaData({ ...newVentaData, Fecha_venta: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Cantidad_vendida">Cantidad Vendida</label>
                        <input type="number" className="form-control" id="Cantidad_vendida" value={newVentaData.Cantidad_vendida} onChange={(e) => setNewVentaData({ ...newVentaData, Cantidad_vendida: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Total_venta">Total Venta</label>
                        <input type="number" step="0.01" className="form-control" id="Total_venta" value={newVentaData.Total_venta} onChange={(e) => setNewVentaData({ ...newVentaData, Total_venta: e.target.value })} />
                    </div>
                    <button className="btn btn-primary" onClick={handleCreateVenta}>Guardar</button>
                    <button className="btn btn-secondary" onClick={() => setCreating(false)}>Cancelar</button>
                </div>
            )}
            <ul className="list-group">
                {ventas.map(venta => (
                    <li key={venta.Codigo} className="list-group-item">
                        <strong>Codigo:</strong> {venta.Codigo} | <strong>Codigo Producto:</strong> {venta.Codigo_producto} | <strong>Nombre Cliente:</strong> {venta.Nombre_cliente} | <strong>Telefono Cliente:</strong> {venta.Telefono_cliente} | <strong>Fecha Venta:</strong> {venta.Fecha_venta} | <strong>Cantidad Vendida:</strong> {venta.Cantidad_vendida} | <strong>Total Venta:</strong> {venta.Total_venta}
                        {editingVentaId === venta.Codigo ? (
                            // Formulario de edición en la página principal
                            <div>
                                <div className="form-group">
                                    <label htmlFor="Codigo_producto">Codigo Producto</label>
                                    <input type="number" className="form-control" id="Codigo_producto" value={editedVentaData.Codigo_producto} onChange={(e) => setEditedVentaData({ ...editedVentaData, Codigo_producto: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Nombre_cliente">Nombre Cliente</label>
                                    <input type="text" className="form-control" id="Nombre_cliente" value={editedVentaData.Nombre_cliente} onChange={(e) => setEditedVentaData({ ...editedVentaData, Nombre_cliente: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Telefono_cliente">Telefono Cliente</label>
                                    <input type="text" className="form-control" id="Telefono_cliente" value={editedVentaData.Telefono_cliente} onChange={(e) => setEditedVentaData({ ...editedVentaData, Telefono_cliente: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Fecha_venta">Fecha Venta</label>
                                    <input type="date" className="form-control" id="Fecha_venta" value={editedVentaData.Fecha_venta} onChange={(e) => setEditedVentaData({ ...editedVentaData, Fecha_venta: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Cantidad_vendida">Cantidad Vendida</label>
                                    <input type="number" className="form-control" id="Cantidad_vendida" value={editedVentaData.Cantidad_vendida} onChange={(e) => setEditedVentaData({ ...editedVentaData, Cantidad_vendida: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Total_venta">Total Venta</label>
                                    <input type="number" className="form-control" id="Total_venta" value={editedVentaData.Total_venta} onChange={(e) => setEditedVentaData({ ...editedVentaData, Total_venta: e.target.value })} />
                                </div>
                                <button className="btn btn-primary" onClick={handleSaveEdit}>Guardar</button>
                            </div>
                        ) : (
                            // Botón de editar en la página principal
                            <button className="btn btn-primary" onClick={() => handleEditarVenta(venta)}>Editar</button>
                        )}
                        <button onClick={() => handleEliminarVenta(venta.Codigo)} className="btn btn-danger btn-sm ml-2">
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaVentas;
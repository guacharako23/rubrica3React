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

const ListaProducto = () => {
  const [productos, setProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editedData, setEditedData] = useState({
    Nombre: '',
    Precio: '',
    Descripcion: '',
    Cantidad_en_stock: '',
  });


  const [newProductoData, setNewProductoData] = useState({
    Nombre: '',
    Descripcion: '',
    Precio: '',
    Cantidad_en_stock: '',
  });




  const obtenerProductos = async () => {
    try {
      // Obtén el token de las cookies
      const token = getCookie('token');
  
      // Configura las cabeceras para incluir el token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Realiza la solicitud con axios y las cabeceras configuradas
      const response = await axios.get('https://rubrica-ultima.onrender.com/api/productos/', { headers }, {
        withCredentials: true,
    },);
  
      // Maneja la respuesta
      setProductos(response.data);
    } catch (error) {
      console.error('Error en la solicitud de productos:', error);
  
      // Puedes manejar el error de autenticación aquí, por ejemplo, redirigir a la página de inicio de sesión
      // o mostrar un mensaje al usuario.
    }
  };
  
  useEffect(() => {
    obtenerProductos();
  }, []); 

  const handleEliminarProducto = async (codigo) => {
    // Send a DELETE request to the backend
    try {
      await axios.delete(`https://rubrica-ultima.onrender.com/api/productos/${codigo}`);
      // Update the product list after deletion
      const updatedProducts = productos.filter(producto => producto.Codigo !== codigo);
      setProductos(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditarProducto = (producto) => {
    setEditingProductId(producto.Codigo);
    setEditedData({
      Nombre: producto.Nombre,
      Precio: producto.Precio,
      Descripcion: producto.Descripcion,
      Cantidad_en_stock: producto.Cantidad_en_stock,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(`https://rubrica-ultima.onrender.com/api/productos/${editingProductId}`, editedData);
      // Actualiza la lista de productos después de la edición
      const updatedProducts = productos.map(producto => (producto.Codigo === editingProductId ? { ...producto, ...editedData } : producto));
      setProductos(updatedProducts);
      // Restaura los valores de edición
      setEditingProductId(null);
      setEditedData({
        Nombre: '',
        Precio: '',
        Descripcion: '',
      });

    
      
    } catch (error) {
      console.error('Error al editar producto:', error);
    }
    
  };

  const handleCreateProducto = async () => {
    try {
      // Enviar una solicitud POST al servidor con la información del nuevo producto
      const response = await axios.post('https://rubrica-ultima.onrender.com/api/productos', newProductoData);

      // Actualizar la lista de productos con el nuevo producto creado
      setProductos([...productos, response.data]);

      // Restaurar el estado para ocultar el formulario de creación
      setCreating(false);

      // Restaurar el estado del nuevo producto
      setNewProductoData({
        Nombre: '',
        Descripcion: '',
        Precio: '',
        Cantidad_en_stock: '',
      });
      obtenerProductos();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
     
  };

  return (

    <div className="container mt-4">
      <h2 className="mb-4">Lista de Productos</h2>


      <button className="btn btn-primary" onClick={() => setCreating(true)}>Presione para crear</button>
      <RenovarTokenButton></RenovarTokenButton>
      <CerrarSesionButton></CerrarSesionButton> 
      {creating && (
        // Formulario de Creación
        <div>
          <div className="form-group">
            <label htmlFor="Nombre">Nombre</label>
            <input type="text" className="form-control" id="Nombre" value={newProductoData.Nombre} onChange={(e) => setNewProductoData({ ...newProductoData, Nombre: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="Descripcion">Descripción</label>
            <textarea className="form-control" id="Descripcion" value={newProductoData.Descripcion} onChange={(e) => setNewProductoData({ ...newProductoData, Descripcion: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="Precio">Precio</label>
            <input type="number" step="0.01" className="form-control" id="Precio" value={newProductoData.Precio} onChange={(e) => setNewProductoData({ ...newProductoData, Precio: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="Cantidad_en_stock">Cantidad en Stock</label>
            <input type="number" className="form-control" id="Cantidad_en_stock" value={newProductoData.Cantidad_en_stock} onChange={(e) => setNewProductoData({ ...newProductoData, Cantidad_en_stock: e.target.value })} />
          </div>
          <button className="btn btn-primary" onClick={handleCreateProducto}>Guardar</button>
          <button className="btn btn-secondary" onClick={() => setCreating(false)}>Cancelar</button>
        </div>
      )}

      <ul className="list-group">
        {productos.map(producto => (
          <li key ={producto.Codigo} className="list-group-item">
            <strong>Codigo:</strong> {producto.Codigo} | <strong>Nombre:</strong> {producto.Nombre} | <strong>Descripcion:</strong> {producto.Descripcion} | <strong>Precio:</strong> {producto.Precio} | <strong>Cantidad en Stock:</strong> {producto.Cantidad_en_stock}
            {editingProductId === producto.Codigo ? (
              // Formulario de edición en la página principal
              <div>
                <div className="form-group">
                  <label htmlFor="Nombre">Nombre</label>
                  <input type="text" className="form-control" id="Nombre" value={editedData.Nombre} onChange={(e) => setEditedData({ ...editedData, Nombre: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="Precio">Precio</label>
                  <input type="number" className="form-control" id="Precio" value={editedData.Precio} onChange={(e) => setEditedData({ ...editedData, Precio: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="Descripcion">Descripción</label>
                  <textarea className="form-control" id="Descripcion" value={editedData.Descripcion} onChange={(e) => setEditedData({ ...editedData, Descripcion: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="Descripcion">Cantidad en Stock</label>
                  <textarea className="form-control" id="Cantidad_en_stock" value={editedData.Cantidad_en_stock} onChange={(e) => setEditedData({ ...editedData, Cantidad_en_stock: e.target.value })} />
                </div>
                <button className="btn btn-primary" onClick={handleSaveEdit}>Guardar</button>
              </div>
            ) : (
              // Botón de editar en la página principal
              <button className="btn btn-primary" onClick={() => handleEditarProducto(producto)}>Editar</button>
            )}
            <button onClick={() => handleEliminarProducto(producto.Codigo)} className="btn btn-danger btn-sm ml-2">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProducto;


import logo from './logo.svg';
import './App.css';
import ListaProducto from './components/manejoProductos/listaProductos';
import ListaVentas from './components/manejoVentas/listaVentas';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './navBar/navBar';
import RegistroComponent from './components/usuarios/registro';
import IngresoComponent from './components/usuarios/ingreso';
import { CookiesProvider } from 'react-cookie';
import ProteccionRuta from './components/usuarios/proteccionRutas';

function App() {
  return (

    <div>
      <CookiesProvider cookies={{ sameSite: 'None', secure: true }}>
        {/* ... tu aplicación */}
      </CookiesProvider>
      <Router>

        <NavbarComponent></NavbarComponent>
        <div>
        <Routes>
        <Route path="/registro" element={<RegistroComponent />} />
        <Route path="/ingreso" element={<IngresoComponent />} />
        <Route path="/productos/*" element={<ProteccionRuta element={<ListaProducto />} />} />
        <Route path="/ventas/*" element={<ProteccionRuta element={<ListaVentas />} />} />
      </Routes>
        </div>

      </Router>
    </div>

  );
}

export default App;

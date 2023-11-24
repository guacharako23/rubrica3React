import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/registro">Registro</Link>
        </li>
        <li>
          <Link to="/ingreso">Ingreso</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
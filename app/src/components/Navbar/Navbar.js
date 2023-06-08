import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">Carbon Cosmos</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/offset">Offset</Link>
        </li>
        <li>
          <Link to="/receipt">Receipt</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

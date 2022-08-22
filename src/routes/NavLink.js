import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../public/logo.png';
// import

const NavLink = () => (
  <header className="app-header">

    {/* <div><img src={logo} alt="Logo" /></div> */}
    <h1 className="dark-blue-color">Space Travelers Hub</h1>
    <nav className="nav-link">
      <Link to="/">Rockets</Link>
      |
      <Link to="/missions">Missions</Link>
      |
      <Link to="/profile">My profile</Link>
    </nav>
  </header>
);

export default NavLink;

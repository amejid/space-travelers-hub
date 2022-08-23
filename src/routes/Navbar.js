import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import styles from './Navbar.module.css';

const Navbar = () => (
  <header className={styles.header}>
    <div className={styles['header-left']}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <p className={styles['header-title']}>Space Travelers Hub</p>
    </div>
    <nav className={styles.nav}>
      <ul className={styles['nav-list']}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.active}` : undefined)}>
            Rockets
          </NavLink>
        </li>
        <li>|</li>
        <li>
          <NavLink
            to="/missions"
            className={({ isActive }) => (isActive ? `${styles.active}` : undefined)}
          >
            Missions
          </NavLink>
        </li>
        <li>|</li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? `${styles.active}` : undefined)}
          >
            My Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;

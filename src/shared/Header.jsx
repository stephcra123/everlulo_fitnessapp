import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/add-exercise"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Add Exercise
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

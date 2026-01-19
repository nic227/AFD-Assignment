import { Link } from 'react-router-dom';
import { useTheme } from '../../context/useTheme';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navBrand}>
          Nicole Grima
        </Link>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/projects" className={styles.navLink}>
              Projects
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
          <li className={styles.navItem}>
            <button
              onClick={toggleTheme}
              className={`${styles.themeToggleSwitch} ${theme === 'dark' ? styles.dark : ''}`}
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className={styles.thumb} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

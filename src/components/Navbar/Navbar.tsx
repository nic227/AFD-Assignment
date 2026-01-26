
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import styles from './Navbar.module.css';


const Navbar = memo(() => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const handleBurgerClick = () => setMenuOpen((open) => !open);
  const handleNavLinkClick = () => setMenuOpen(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Home link handler: always go to '/' and scroll to #home
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById('home');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('home');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navBrand}>
          Nicole Grima
        </Link>
        <button
          className={styles.burger}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={handleBurgerClick}
        >
          <span className={styles.burgerBar}></span>
          <span className={styles.burgerBar}></span>
          <span className={styles.burgerBar}></span>
        </button>
        <ul
          id="main-menu"
          className={`${styles.navList} ${menuOpen ? styles.open : ''}`}
        >
          <li className={styles.navItem}>
            <a href="#home" className={styles.navLink} onClick={handleHomeClick}>
              Home
            </a>
          </li>
          <li className={styles.navItem}>
            <Link to="/about" className={styles.navLink} onClick={handleNavLinkClick}>
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/projects" className={styles.navLink} onClick={handleNavLinkClick}>
              Projects
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contact" className={styles.navLink} onClick={handleNavLinkClick}>
              Contact
            </Link>
          </li>
          <li className={styles.navItem}>
            <button
              onClick={handleToggleTheme}
              className={`${styles.themeToggleSwitch} ${theme === 'dark' ? styles.dark : ''}`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className={styles.thumb} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;

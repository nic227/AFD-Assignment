import { Link } from 'react-router-dom';
import { memo, useMemo } from 'react';
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicole-grima-32a74317b/?originalSubdomain=mt",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.24 8.5h4.52V24H.24zM8.48 8.5H13v2.12h.06c.63-1.2 2.17-2.46 4.46-2.46C22.4 8.16 24 10 24 13.67V24h-4.52v-9.12c0-2.17-.78-3.64-2.73-3.64-1.49 0-2.38 1-2.77 1.96-.14.34-.17.8-.17 1.27V24H9.29s.06-13.56 0-15.5h4.52v2.2z"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/nic227",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1 .11-.8.42-1.32.76-1.62-2.67-.3-5.48-1.34-5.48-5.97 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.5.12-3.13 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.63.24 2.83.12 3.13.77.85 1.24 1.93 1.24 3.25 0 4.64-2.82 5.66-5.5 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5"
        />
      </svg>
    ),
  },
];

const Footer = memo(() => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.column}>
            <div className={styles.logo}>Nicole Grima</div>
            <p className={styles.description}>
              Full-stack developer passionate about creating beautiful and functional web experiences.
            </p>
            <div className={styles.socialContainer}>
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  className={styles.socialIcon}
                  href={social.href}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <div className={styles.linkList}>
              {quickLinks.map((link) => (
                <Link key={link.label} className={styles.link} to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Get in Touch</h3>
            <div className={styles.linkList}>
              <span className={styles.link}>📧 nicole.grima.d56937@mcast.edu.mt</span>
              <span className={styles.link}>📍 Paola, Malta</span>
              <span className={styles.link}>🌐 Available for work</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {year} Nicole Grima. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a className={styles.bottomLink} href="#privacy">
              Privacy Policy
            </a>
            <a className={styles.bottomLink} href="#terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
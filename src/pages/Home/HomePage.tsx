import React, { useEffect, useState } from 'react';
import AboutPage from '../About/AboutPage';
import ContactPage from '../Contact/ContactPage';
import html5Icon from '../../assets/icons/html5.svg';
import cssIcon from '../../assets/icons/css.svg';
import reactIcon from '../../assets/react.svg';
import nodeIcon from '../../assets/icons/nodedotjs.svg';
import vueIcon from '../../assets/icons/vuedotjs.svg';
import gitIcon from '../../assets/icons/git.svg';
import githubIcon from '../../assets/icons/github.svg';
import nextIcon from '../../assets/icons/nextdotjs.svg';
import styles from './HomePage.module.css';

const Portfolio = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [autoRotation, setAutoRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoRotation((prev) => (prev + 1.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { name: 'HTML5', icon: <img className={styles.techIconImage} src={html5Icon} alt="HTML5" /> },
    { name: 'CSS3', icon: <img className={styles.techIconImage} src={cssIcon} alt="CSS3" /> },
    { name: 'React', icon: <img className={styles.techIconImage} src={reactIcon} alt="React" /> },
    { name: 'Node.js', icon: <img className={styles.techIconImage} src={nodeIcon} alt="Node.js" /> },
    { name: 'Vue', icon: <img className={styles.techIconImage} src={vueIcon} alt="Vue" /> },
    { name: 'Git', icon: <img className={styles.techIconImage} src={gitIcon} alt="Git" /> },
    { name: 'GitHub', icon: <img className={styles.techIconImage} src={githubIcon} alt="GitHub" /> },
    { name: 'Next.js', icon: <img className={styles.techIconImage} src={nextIcon} alt="Next.js" /> },
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navBrand}>
            <span className={styles.navBrandText}>Nicole Grima</span>
          </div>

          <div className={styles.navLinks}>
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={styles.navLink}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className={styles.hero} id="home">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              My Portfolio<span className={styles.titleDot}>.</span>
            </h1>

            <div className={styles.heroIntro}>
              <div className={styles.introLine}>
                <div className={styles.orangeLine}></div>
                <p className={styles.introText}>I'm Nicole</p>
              </div>
              <h2 className={styles.subtitle}>Creative Computing</h2>
              <h2 className={styles.subtitle}>MCAST Student</h2>
            </div>

            <div className={styles.buttonGroup}>
              <a href="#contact" className={styles.btnPrimary}>
                Get In Touch
              </a>
              <button className={styles.btnSecondary}>View Resume</button>
            </div>
          </div>

          <div className={styles.circleContainer}>
            <div className={styles.circleWrapper}>
              <div className={`${styles.floatingEl} ${styles.floatingEl1}`}>
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="8" fill="#f97316" opacity="0.2" />
                </svg>
              </div>
              <div className={`${styles.floatingEl} ${styles.floatingEl2}`}>
                <div className={styles.floatingCircle}></div>
              </div>
              <div className={`${styles.floatingEl} ${styles.floatingEl3}`}>
                <div className={styles.floatingDiamond}></div>
              </div>

              <div
                className={styles.circleMain}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  className={styles.outerRing}
                  style={{
                    transform: `rotate(${autoRotation}deg) scale(${isHovered ? 1.1 : 1})`,
                    opacity: isHovered ? 0.6 : 0.4,
                  }}
                >
                  <div className={styles.ringDot1}></div>
                  <div className={styles.ringDot2}></div>
                </div>

                <div
                  className={styles.ngCircle}
                  style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isHovered
                      ? '0 30px 70px rgba(249, 115, 22, 0.5), 0 0 80px rgba(249, 115, 22, 0.3)'
                      : '0 20px 50px rgba(249, 115, 22, 0.4)',
                  }}
                >
                  <div className={styles.innerGlow}></div>
                </div>

                {[0, 120, 240].map((angle, i) => (
                  <div
                    key={`orbit-${angle}-${i}`}
                    className={styles.orbitDot}
                    style={{ transform: `rotate(${angle + autoRotation * 2}deg) translateX(110px)` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.techStack}>
        <div className={styles.techContainer}>
          <div className={styles.techScrollWrapper}>
            <div className={styles.techGrid}>
              {[...techStack, ...techStack].map((tech, index) => (
                <div key={`${tech.name}-${index}`} className={styles.techCard}>
                  <div className={styles.techIcon}>{tech.icon}</div>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutPage />
      <ContactPage />
    </div>
  );
};

export default Portfolio;

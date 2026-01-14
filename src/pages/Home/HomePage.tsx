import React, { useState } from 'react';
import styles from './HomePage.module.css';

const Portfolio = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [autoRotation, setAutoRotation] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAutoRotation(prev => (prev + 1.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.navBrandText}>Nicole Grima</span>
        </div>
        
        <div className={styles.navLinks}>
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={styles.navLink}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          {/* Left Content */}
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
              <button className={styles.btnPrimary}>
                Get In Touch
              </button>
              <button className={styles.btnSecondary}>
                View Resume
              </button>
            </div>
          </div>

          {/* Right - NG Circle */}
          <div className={styles.circleContainer}>
            <div className={styles.circleWrapper}>
              {/* Floating Elements */}
              <div className={`${styles.floatingEl} ${styles.floatingEl1}`}>
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="8" fill="#f97316" opacity="0.2"/>
                </svg>
              </div>
              <div 
                className={`${styles.floatingEl} ${styles.floatingEl2}`}
              >
                <div className={styles.floatingCircle}></div>
              </div>
              <div 
                className={`${styles.floatingEl} ${styles.floatingEl3}`}
              >
                <div className={styles.floatingDiamond}></div>
              </div>

              {/* Main Logo Circle */}
              <div 
                className={styles.circleMain}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Outer Ring */}
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

                {/* Main Circle */}
                <div 
                  className={styles.ngCircle}
                  style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isHovered 
                      ? '0 30px 70px rgba(249, 115, 22, 0.5), 0 0 80px rgba(249, 115, 22, 0.3)'
                      : '0 20px 50px rgba(249, 115, 22, 0.4)',
                  }}
                >
                  
                  {/* Inner glow */}
                  <div className={styles.innerGlow}></div>
                </div>

                {/* Orbiting particles */}
                {[0, 120, 240].map((angle, i) => (
                  <div
                    key={i}
                    className={styles.orbitDot}
                    style={{
                      transform: `rotate(${angle + autoRotation * 2}deg) translateX(110px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.techStack}>
        <div className={styles.techContainer}>
          <div className={styles.techGrid}>
            {[
              { name: 'HTML5', color: '#E34F26' },
              { name: 'CSS3', color: '#1572B6' },
              { name: 'JavaScript', color: '#F7DF1E' },
              { name: 'React', color: '#61DAFB' },
              { name: 'Node.js', color: '#339933' },
              { name: 'Vue', color: '#4FC08D' },
            ].map((tech, index) => (
              <div
                key={index}
                className={styles.techCard}
              >
                <div 
                  className={styles.techIcon}
                  style={{ backgroundColor: `${tech.color}33` }}
                >
                  <div 
                    className={styles.techColorBox}
                    style={{ backgroundColor: tech.color }}
                  ></div>
                </div>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
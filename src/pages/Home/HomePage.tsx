import React, { useState } from 'react';
import styles from './HomePage.module.css';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [autoRotation, setAutoRotation] = useState(0);

  // Auto-rotate animation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAutoRotation(prev => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = () => {
    // Mouse move handler
  };

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          Nicole Grima
        </div>
        
        <div className={styles.navLinks}>
          <a href="#home" className={styles.navLink}>Home</a>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
          <a href="#projects" className={styles.navLink}>Projects</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          {/* Left Side - Text Content */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Hello<span className={styles.dot}>.</span>
            </h1>
            
            <div className={styles.heroIntro}>
              <div className={styles.introLine}>
                <div className={styles.orangeLine}></div>
                <p className={styles.introText}>I'm Nicole</p>
              </div>
              <h2 className={styles.heroSubtitle}>Creative Computing</h2>
              <h2 className={styles.heroSubtitle}>MCAST Student</h2>
            </div>

            {/* Buttons */}
            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary}>
                Contact Me
              </button>
              <button className={styles.btnSecondary}>
                My Resume
              </button>
            </div>
          </div>

          {/* Right Side - Interactive NG Circle */}
          <div className={styles.heroCircleContainer}>
            <div 
              className={styles.heroCircle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Outer Rotating Rings */}
              <div 
                className={styles.circleOuter}
                style={{ 
                  transform: `rotate(${autoRotation * 1}deg)`,
                  borderColor: isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.5)'
                }}
              ></div>

              <div 
                className={styles.circleOuter2}
                style={{ 
                  transform: `rotate(${-autoRotation * 1.3}deg)`,
                  borderColor: isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.4)'
                }}
              ></div>

              <div 
                className={styles.circleOuter3}
                style={{ 
                  transform: `rotate(${autoRotation * 0.7}deg)`,
                  borderColor: isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)'
                }}
              ></div>

              {/* Main Circle */}
              <div className={`${styles.circleMain} ${isHovered ? styles.hovered : ''}`}>
                {/* NG Initials */}
                <span className={`${styles.initials} ${isHovered ? styles.hovered : ''}`}>NG</span>

                {/* Animated shine effect */}
                <div className={styles.shineEffect}></div>

                {/* Orbiting Dots */}
                {[0, 90, 180, 270].map((angle, i) => (
                  <div
                    key={i}
                    className={styles.orbitDot}
                    style={{ transform: `rotate(${angle + autoRotation * 2}deg) translateX(10rem)` }}
                  ></div>
                ))}

                {/* Inner rotating particles */}
                {[45, 135, 225, 315].map((angle, i) => (
                  <div
                    key={`inner-${i}`}
                    className={styles.innerParticle}
                    style={{ transform: `rotate(${angle - autoRotation * 1.5}deg) translateX(7rem)` }}
                  ></div>
                ))}
              </div>

              {/* Pulsing glow effect */}
              <div 
                className={`${styles.pulseRing} ${isHovered ? styles.active : ''}`}
                style={{
                  opacity: isHovered ? 0.4 : 0.2,
                  transform: isHovered ? 'scale(1.3)' : 'scale(1)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Bar - Full Width */}
      <section className={styles.techStackWrapper}>
        <div className={styles.techStack}>
          {['HTML', 'CSS', 'JAVASCRIPT', 'Node.JS', 'REACT', 'VUE'].map((tech, index) => (
            <span key={index} className={styles.techItem}>
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
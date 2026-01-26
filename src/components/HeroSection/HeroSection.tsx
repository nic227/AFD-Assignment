

// HeroSection component
// Displays the main hero section with intro, call-to-action, and animated visuals
import { memo } from 'react';
import styles from '../../pages/Home/HomePage.module.css';

interface HeroSectionProps {
  isHovered: boolean; // Whether the hero is hovered (for animation)
  onMouseEnter: () => void; // Mouse enter handler
  onMouseLeave: () => void; // Mouse leave handler
}

export const HeroSection = memo<HeroSectionProps>(
  ({ isHovered, onMouseEnter, onMouseLeave }) => (
    <section className={styles.hero} id="home">
      <div className={styles.heroGrid}>
        {/* Main hero content */}
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

          {/* Call-to-action buttons */}
          <div className={styles.buttonGroup}>
            <a href="#contact" className={styles.btnPrimary} aria-label="Get in touch with me">
              Get In Touch
            </a>
            <button className={styles.btnSecondary} aria-label="View my resume">
              View Resume
            </button>
          </div>
        </div>

        {/* Animated floating elements and visuals */}
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
              className={`${styles.circleMain} ${isHovered ? styles.hovered : ''}`}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className={styles.outerRing}>
                <div className={styles.ringDot1}></div>
                <div className={styles.ringDot2}></div>
                <div className={`${styles.orbitDot} ${styles.orbitDotA}`}></div>
                <div className={`${styles.orbitDot} ${styles.orbitDotB}`}></div>
                <div className={`${styles.orbitDot} ${styles.orbitDotC}`}></div>
              </div>

              <div className={styles.ngCircle}>
                <div className={styles.innerGlow}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
);

HeroSection.displayName = 'HeroSection';

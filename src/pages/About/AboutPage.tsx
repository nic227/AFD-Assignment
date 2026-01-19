import React, { memo } from 'react';
import styles from './About.module.css';

const About: React.FC = memo(() => {
  return (
    <section className={styles.aboutSection} id="about">
      <h2 className={styles.aboutTitle}>About Me</h2>

      <div className={styles.aboutContent}>
        <p className={styles.aboutText}>
          I'm currently pursuing a degree in Creative Computing, where I enjoy combining design and
          development to create clean, user-friendly digital experiences. I'm especially passionate
          about building interfaces that are both functional and visually engaging, and I enjoy
          exploring how design decisions affect usability, accessibility, and overall user
          experience.
        </p>
        <p className={styles.aboutText}>
          I'm drawn to projects that bring together creativity and technology, from planning layouts
          and refining user journeys to turning ideas into working designs using tools like Figma
          and Visual Studio Code. I enjoy staying up to date with new frameworks and continuously
          improving my front-end development skills.
        </p>
        <p className={styles.aboutText}>
          Alongside my studies, I have over five years of professional experience at GO Plc, where I
          worked on user acceptance testing (UAT), quality assurance (QA), and platforms including
          WordPress and Salesforce. This experience strengthened my analytical thinking and gave me
          insight into the full lifecycle of digital product development.
        </p>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>
              6<span className={styles.statPlus}>+</span>
            </div>
            <div className={styles.statLabel}>Years of Education</div>
            <div className={styles.progressBar}>
              <div className={`${styles.progressFill} ${styles.progressFull}`}></div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNumber}>
              5<span className={styles.statPlus}>+</span>
            </div>
            <div className={styles.statLabel}>Years of Work Experience</div>
            <div className={styles.progressBar}>
              <div className={`${styles.progressFill} ${styles.progressFull}`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;

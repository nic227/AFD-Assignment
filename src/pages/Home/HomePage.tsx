import { useState, useMemo, useCallback } from 'react';
import AboutPage from '../About/AboutPage';
import ProjectsPage from '../Projects/ProjectsPage';
import ContactPage from '../Contact/ContactPage';
import { HeroSection } from '../../components/HeroSection/HeroSection';
import { TechStack } from '../../components/TechStack/TechStack';
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

  const techStack = useMemo(
    () => [
      { name: 'HTML5', icon: <img className={styles.techIconImage} src={html5Icon} alt="HTML5" /> },
      { name: 'CSS3', icon: <img className={styles.techIconImage} src={cssIcon} alt="CSS3" /> },
      { name: 'React', icon: <img className={styles.techIconImage} src={reactIcon} alt="React" /> },
      {
        name: 'Node.js',
        icon: <img className={styles.techIconImage} src={nodeIcon} alt="Node.js" />,
      },
      { name: 'Vue', icon: <img className={styles.techIconImage} src={vueIcon} alt="Vue" /> },
      { name: 'Git', icon: <img className={styles.techIconImage} src={gitIcon} alt="Git" /> },
      {
        name: 'GitHub',
        icon: <img className={styles.techIconImage} src={githubIcon} alt="GitHub" />,
      },
      {
        name: 'Next.js',
        icon: <img className={styles.techIconImage} src={nextIcon} alt="Next.js" />,
      },
    ],
    []
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div className={styles.container}>
      <HeroSection isHovered={isHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />

      <TechStack techStack={techStack} />

      <AboutPage />
      <ProjectsPage />
      <ContactPage />
    </div>
  );
};

export default Portfolio;

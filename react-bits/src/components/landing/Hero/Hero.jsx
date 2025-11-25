import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SplitText from '../../../content/TextAnimations/SplitText/SplitText';
import landingBlur from '../../../assets/svg/landing-blur.svg';
import { GoArrowRight } from 'react-icons/go';
import FadeContent from '../../../content/Animations/FadeContent/FadeContent';

const ResponsiveSplitText = ({ isMobile, text, ...rest }) =>
  isMobile ? <span className={rest.className}>{text}</span> : <SplitText text={text} {...rest} />;

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className="landing-content">
      <img
        src={landingBlur}
        alt=""
        aria-hidden="true"
        className="landing-gradient-blur"
        draggable="false"
        style={{ zIndex: 5 }}
      />

      <img
        src={landingBlur}
        alt=""
        aria-hidden="true"
        className="landing-gradient-blur"
        draggable="false"
        style={{ zIndex: 5 }}
      />

      <div className="hero-main-content">
        <FadeContent className="hero-tag-fade" blur>
          <Link to="/animations/ghost-cursor" className="hero-new-badge-container">
            <span className="hero-new-badge">New 🎉</span>
            <div className="hero-new-badge-text">
              <span>Ghost Cursor</span>
              <GoArrowRight />
            </div>
          </Link>
        </FadeContent>

        <h1 className="landing-title">
          <ResponsiveSplitText
            isMobile={isMobile}
            text="React Components"
            className="hero-split"
            splitType="chars"
            delay={30}
            duration={2}
            ease="elastic.out(0.5, 0.3)"
          />
          <br />
          <ResponsiveSplitText
            isMobile={isMobile}
            text="For Creative Developers"
            className="hero-split"
            splitType="chars"
            delay={30}
            duration={2}
            ease="elastic.out(0.5, 0.3)"
          />
        </h1>

        <ResponsiveSplitText
          isMobile={isMobile}
          className="landing-subtitle"
          splitType="words"
          delay={25}
          duration={1}
          text="Highly customizable animated components that make your React projects truly stand out"
        />

        <Link to={'/get-started/index'} className="landing-button">
          <span>Browse Components</span>
          <div className="button-arrow-circle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

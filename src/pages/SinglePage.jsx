import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import '../pages/singlePage.scss';
import Navbar from '../components/Navbar/Navbar.jsx';
import Home from '../components/Home/Home.jsx';
import Cave from '../components/Cave/Cave.jsx';
import About from '../components/About/About.jsx';
import Work from '../components/Work/Work.jsx';
import Activities from '../components/Activities/Activities.jsx';
import Portfolio from '../components/Portfolio/Portfolio.jsx';
import Contact from '../components/Contact/Contact.jsx';
import Footer from '../components/Footer/Footer.jsx';
import LangSwitcher from '../components/LangSwitcher/LangSwitcher.jsx';
import Titre from '../components/Titre/Titre.jsx';

gsap.registerPlugin(Observer, ScrollToPlugin);

const SinglePage = ({ selectedLanguage, changeLanguage }) => {
  const sections = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollDelay = 500;

  const caveRef = useRef(null);

  useEffect(() => {
    let scrollTimeout = null;

    const scrollToSection = (index) => {
      if (index >= 0 && index < sections.current.length) {
        gsap.to(window, {
          scrollTo: { y: sections.current[index], autoKill: false, ease: 'power1.inOut' },
          duration: 1.5,
        });

        sections.current.forEach((section, i) => {
          if (i === index) {
            gsap.to(section, { opacity: 1, duration: 0.2, ease: 'power1.inOut' });
            section.classList.add('active');
          } else {
            gsap.to(section, { opacity: 0, duration: 0.2, ease: 'power1.inOut' });
            section.classList.remove('active');
          }
        });

        setCurrentSection(index);
        setIsScrolling(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => setIsScrolling(false), scrollDelay);
      }
    };

    const handleScroll = (event) => {
      if (isScrolling) return;

      if (event.deltaY > 0) {
        if (currentSection < sections.current.length - 1) {
          scrollToSection(currentSection + 1);
        }
      } else if (event.deltaY < 0) {
        if (currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    Observer.create({
      target: window,
      type: 'wheel,touch',
      onWheel: handleScroll,
      onTouch: handleScroll,
      tolerance: 10,
    });

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        if (currentSection < sections.current.length - 1) {
          scrollToSection(currentSection + 1);
        }
      } else if (event.key === 'ArrowUp') {
        if (currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      Observer.getAll().forEach((observer) => observer.kill());
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isScrolling]);

  useEffect(() => {
    const handleScroll = () => {
      if (caveRef.current) {
        const homeRect = sections.current[0]?.getBoundingClientRect() || {};
        const caveRect = caveRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (homeRect.bottom > 0) {
          caveRef.current.classList.add('hidden');
        } else if (caveRect.top <= windowHeight && caveRect.bottom >= 0) {
          caveRef.current.classList.remove('hidden');
        }
      }
    };
    
    // Ajouter l'événement de scroll
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sections.current.includes(el)) {
      sections.current.push(el);
    }
  };

  return (
    <div className='website-content'>
      <LangSwitcher selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
      <Navbar />
      <div className="section-wrapper" ref={addToRefs}>
        <Home selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
      </div>
      <div className="cave-titre-wrapper">
        <div className="cave-container" ref={caveRef}>
          <Cave />
        </div>
        <div className="titre" ref={addToRefs}>
          <Titre />
        </div>
      </div>
      <div className="section-wrapper" ref={addToRefs}>
        <About selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
      </div>
      <div className="section-wrapper sw-work" ref={addToRefs}>
        <Work selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
      </div>
      <div className="section-wrapper sw-act" ref={addToRefs}>
        <Activities selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
      </div>
      <div className="section-wrapper sw-port" ref={addToRefs}>
        <Portfolio selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
      </div>

      {/* Contact and Footer Section */}
      <div className="section-wrapper" ref={addToRefs}>
        <Contact selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
        <Footer selectedLanguage={selectedLanguage} changeLanguage={changeLanguage} />
      </div>
    </div>
  );
};

export default SinglePage;

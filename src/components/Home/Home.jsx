import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LangSwitcher/LangSwitcher.jsx';
import '../Home/home.scss';
import { TiThListOutline } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";

const Home = ({ selectedLanguage, changeLanguage }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    setMousePos({ x, y });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    window.location.href = 'https://cal.com/omiage';
  };

  return (
    <section id='home'>
      <div className='background-layer layer1' style={{ transform: `translate(${mousePos.x * 0.030}px, ${mousePos.y * 0.030}px)` }}></div>
      <div className='background-layer layer2' style={{ transform: `translate(${mousePos.x * 0.020}px, ${mousePos.y * 0.020}px)` }}></div>
      <div className='background-layer layer3' style={{ transform: `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.0}px)` }}></div>
      {isEnglish ? (
          <div className='text-home'>
            <h1>{t('head1')} 
            <span className='colored-text'> {t('head2')} </span> {t('head3')} </h1>
            <h1> {t('head4')} </h1>
          </div>
        ) : (
          <div className='text-home'>
            <h1> {t('head1')} </h1>
            <h1> <span className='colored-text'> {t('head2')} </span> {t('head3')} </h1>
          </div>
        )}


      <div className='header'>
        <img 
          src='/images/logo-head.svg' 
          alt='Logo' 
          className={`logo-head ${isScrolled ? 'hidden' : ''}`} 
        />
        <LanguageSwitcher 
          selectedLanguage={selectedLanguage} 
          changeLanguage={changeLanguage} 
        />
      </div>

      
       

        <div className='bottom-home'>
          <div className="button-container">
            <button className="buttontext" onClick={handleClick}>
              <img src='/images/logotel.svg' alt='Logo certified' className='logo' />
              {t('contactMe')} <IoIosArrowForward />
            </button>
            <button className="buttontext" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              <TiThListOutline /> {t('wishlist')} <IoIosArrowForward />
            </button>
          </div>
          <div className='logo-certif'>
            <img src='/images/certified.svg' alt='Logo certified' className='certified' />
          </div>
        </div>
      
    </section>
  );
};

export default Home;

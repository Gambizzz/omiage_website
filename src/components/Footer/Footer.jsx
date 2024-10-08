import React from 'react';
import './footer.scss'; 
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    window.location.href = 'https://www.linkedin.com/in/sratton/';
  }

  return (
    <footer id="footer">
      <div className="footer-content">
        <img src='./images/logo_footer.svg' alt="Logo" className="footer-logo" />
        <div >
          <p>{t('footer')}</p>
        </div>
        <div className="footer-logo2" onClick={handleClick}>
          <img src='./images/in.svg' alt="Logo"  />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
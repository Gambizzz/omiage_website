import React, { useState, useEffect } from 'react';
import LanguageSwitcher from '../LangSwitcher/LangSwitcher.jsx';
import { Doughnut } from 'react-chartjs-2';
import '../Work/work.scss';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Enregistrement des composants nécessaires
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Work = () => {
  const { t, i18n } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = {
    labels: [
      t('energy'),
      'Web3',
      t('luxe'),
      'Public',
      t('bank'),
      t('auto'),
      'Gaming'
    ],
    datasets: [
      {
        data: [4, 2, 1, 1, 1, 1, 1],
        backgroundColor: [
          '#0068ff',
          '#a055fa',
          '#73e176',
          '#2190ed',
          '#00cee4',
          '#9fadc7',
          '#73e176'
        ],
        borderWidth: 0,
        hoverOffset: 25, // Augmente la taille du segment au survol
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 25,
          padding: 12,
          font: {
            size: 14,
            family: 'Roboto Slab',
            weight: 'bold',
          },
          color: '#D9D9D9',
        },
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: 'transparent',
      },
    },
    rotation: -90, // Commencer le demi-cercle à 180 degrés
    circumference: 180, // Afficher seulement la moitié du cercle
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        const { index } = chartElement[0];
        setHoveredIndex(index);
      } else {
        setHoveredIndex(0);
      }
    },
  };

  const categoryImages = [
    './images/energy.svg',
    './images/openloot.svg',
    './images/chanel.svg',
    './images/mdlm.svg',
    './images/generali.svg',
    './images/bmw.svg',
    './images/EA.svg',
  ];

  const experienceYears = [4, 2, 1, 1, 1, 1, 1];

  useEffect(() => {
    // Définir le premier label comme survolé au montage
    setHoveredIndex(0);
  }, []);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <section id="work">
      <div className='header-container'>
        <h2>{t('sectors')}</h2>
        <LanguageSwitcher 
            selectedLanguage={i18n.language} 
            changeLanguage={handleLanguageChange} 
        />
      </div>

      <div id="chartdiv">
        <Doughnut data={data} options={options} className="doughnut-chart"/>
        {hoveredIndex !== null && (
          <div className="center-content">
            <img
              src={categoryImages[hoveredIndex]}
              alt={data.labels[hoveredIndex]}
              className="center-image"
            />
            <div className="experience-text">
              {experienceYears[hoveredIndex]} an(s) d'expérience
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;

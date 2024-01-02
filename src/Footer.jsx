import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/LOGO-NEU.com.logo.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="flex flex-col text-grey items-center py-8 bg-[#B8C0D2]">
      <Link to="/"><img src={logo} alt="Biernath Legal Logo" className="h-12 md:h-20" /></Link>
      <h2 className='mb-4'>Biernath Legal</h2>
      <div className='flex space-x-2'>
        <Link to="/imprint"><p>{t('navbar.imprint')}</p></Link>
        <p>|</p>
        <Link to="/data-protection-policy"><p>{t('navbar.data')}</p></Link>
      </div>
    </footer>
  );
};

export default Footer;

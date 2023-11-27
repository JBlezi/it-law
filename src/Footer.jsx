import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/biernath.com.favicon.png';

const Footer = () => {

  return (
    <div className="flex flex-col text-grey items-center py-8 bg-[#B8C0D2]">
      <Link to="/home"><img src={logo} alt="Biernath Legal Logo" className="h-12 md:h-20 rounded-full" /></Link>
      <h2 className='mb-4'>Biernath Legal</h2>
      <div className='flex space-x-2'>
        <Link to="/imprint"><p>IMPRINT</p></Link>
        <p>|</p>
        <Link to="/data-protection-policy"><p>DATA PROTECTION POLICY</p></Link>
      </div>
    </div>
  );
};

export default Footer;

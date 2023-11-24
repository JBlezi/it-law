import { Suspense, useState } from "react";
import { Link } from 'react-router-dom';
import logo from './images/biernath.com.favicon.png';
import hamburger from './images/hamburger.svg';
import closingX from './images/ClosingX.svg';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ onSearch }) => {
  /*   const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("lng") || 'de');
  const { t, i18n } = useTranslation(''); */

/*   const toggleLanguage = (lang) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang)
  }; */

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("onsearch", onSearch)
    onSearch(e.target.value);
  };

  return (
    <nav className="p-4 text-black">
      <div className="flex items-center justify-between lg:mx-10 lg:mt-10">
        <Link to="/home"><img src={logo} alt="Biernath Legal Logo" className="h-12 md:h-20 rounded-full" /></Link>
        <FaSearch className="text-2xl"/>
        <input
          type="text"
          placeholder="Search posts"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 rounded-lg" // Add your styling classes
        />
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer lg:hidden">
          {!isOpen ? (
              <img src={hamburger} alt="Open menu" className="h-10 w-10" />
          ) : (
              <img src={closingX} alt="Close menu" className="h-10 w-10" />
          )}
        </div>
{/*         <div className='wrap flex flex-row'>
          <div className='fill-wrap'>
            <div className="flex flex-row mx-4 text-xl md:text-2xl">
              <button onClick={() => toggleLanguage('en')} className={currentLanguage === 'en' ? 'active' : ''}>EN<span style={{color: 'black'}}>/</span></button>
              <button onClick={() => toggleLanguage('de')} className={currentLanguage === 'de' ? 'active' : ''}>DE</button>
            </div>
            <a href='mailto:ra@biernath.com' className='btn btn-desert btn-b-t md:p-6 p-3 text-xl md:text-3xl rounded-full'>{t('navbar.contact')}</a>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;


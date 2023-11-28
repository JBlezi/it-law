import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from './images/biernath.com.favicon.png';
import hamburger from './images/hamburger.svg';
import hamburgerWhite from './images/hamburgerSvg-white.svg'
import closingXWhite from './images/closingX-white.svg'
import closingX from './images/ClosingX.svg';
import { FaSearch } from 'react-icons/fa';
import { fetchSocial } from "./contentful";
import Social from "./Social";
import { useTranslation } from 'react-i18next';


const Navbar = ({ onSearch }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [socials, setSocials] = useState([]);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isDarkMode = () => document.documentElement.classList.contains('dark');

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };


  const handleLanguageChange = (language, e) => {
    e.stopPropagation(); // Prevents event from propagating to parent elements
    changeLanguage(language);
  };


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    const getSocials = async () => {
      const socialMedia = await fetchSocial();
      setSocials(socialMedia);
    };
    getSocials();
  },[i18n]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("onsearch", onSearch)
    onSearch(e.target.value);
  };

  const MenuModal = () => {

    return (
      <div className="fixed inset-0 z-50 bg-light dark:bg-grey dark:text-light p-5 w-full h-screen">
        <div className="flex justify-between">
          <img src={logo} alt="Biernath Legal Logo" className="h-16 w-16"/>
          <img src={isDarkMode() ? closingXWhite : closingX} alt="Close menu" className="h-8 w-8 m-4"/>
        </div>
        <div className="text-2xl font-medium flex flex-col justify-center items-end my-auto h-full space-y-8">
          <div className="mb-32 flex flex-col items-end space-y-8 mx-8">
          <div className="">
            <button onClick={(e) => handleLanguageChange('en', e)} className={`language-button ${currentLanguage === 'en' ? 'font-bold' : ''}`}>EN/</button>
            <button onClick={(e) => handleLanguageChange('de', e)} className={`language-button ${currentLanguage === 'de' ? 'font-bold' : ''}`}>DE</button>
          </div>
            <Link to="/home"><p>HOME</p></Link>
            <Link to="/about-us"><p>{t('navbar.about')}</p></Link>
          </div>
          <Link to="/imprint" className="mx-8"><p>{t('navbar.imprint')}</p></Link>
          <Link to="/data-protection-policy" className="mx-8"><p>{t('navbar.data')}</p></Link>
          <div className='mt-32 flex flex-wrap mx-8'>
            {socials.length > 0 && socials.map(social => (
              <div className='w-1/2' key={social.sys.id}>
                <Social title={social.fields.title} image={social.fields.icon.fields.file.url} link={social.fields.link}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="p-4 text-black">
      <div className="flex items-center justify-between lg:mx-10 lg:mt-10">
        <Link to="/home"><img src={logo} alt="Biernath Legal Logo" className="h-12 md:h-20 rounded-full" /></Link>
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 text-lg text-gray-400 dark:text-light" />
          <input
            type="text"
            placeholder={t('navbar.search')}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-3 py-3 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-light-grey dark:placeholder-light"
          />
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer lg:hidden">
          {!isOpen ? (
            <img src={isDarkMode() ? hamburgerWhite : hamburger} alt="Open menu" className="h-10 w-10" />
          ) : (
              <MenuModal />
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

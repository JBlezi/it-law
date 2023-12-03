import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from './images/biernath.com.favicon.png';
import hamburger from './images/hamburger.svg';
import hamburgerWhite from './images/hamburgerSvg-white.svg'
import closingXWhite from './images/closingX-white.svg'
import closingX from './images/ClosingX.svg';
import { FaSearch } from 'react-icons/fa';
import { fetchSocial, fetchBlogPosts } from "./contentful";
import Social from "./Social";
import { useTranslation } from 'react-i18next';


const Navbar = ({ onSearch }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [socials, setSocials] = useState([]);
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const location = useLocation();
  const isCategoryPage = location.pathname.includes('/category');
  const currentLanguage = i18n.language;
  const isDarkMode = () => document.documentElement.classList.contains('dark');

  const changeLanguage = (language) => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  };


  const handleLanguageChange = (language, e) => {
    e.stopPropagation(); // Prevents event from propagating to parent elements
    changeLanguage(language);
  };

  const CategoriesDropdown = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (event) => {
      event.stopPropagation(); // This will stop the event from propagating to parent elements
      setIsOpen(!isOpen);
    };

    return (
      <div className="inline-block text-left w-full xl:mr-8 relative">
        <div className="w-full">
          <button type="button" onClick={toggleDropdown} className="inline-flex justify-end w-full py-2 text-2xl md:text-4xl xl:text-2xl xl:font-base font-medium text-light" id="menu-button" aria-expanded="true" aria-haspopup="true">
            CATEGORIES
            <svg className="-mr-1 ml-2 h-10 w-10 xl:h-8 xl:w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="max-h-32">
            <div className="right-0 mt-2 text-light bg-grey absolute z-20 xl:hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                {categories.map((category, index) => (
                  <Link key={index} to={`/category/${category}`} className="block text-right px-4 py-2 text-xl md:text-2xl hover:bg-gray-100 w-full" role="menuitem" tabIndex="-1" id={`menu-item-${index}`} onClick={() => setIsOpen(false)}>
                    {category.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
            <div className="right-0 mt-2 text-light bg-grey absolute z-20 hidden xl:block rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                {categories.map((category, index) => (
                  <Link key={index} to={`/category/${category}`} className="block text-right px-4 py-2 text-xl md:text-2xl hover:bg-gray-900 w-full" role="menuitem" tabIndex="-1" id={`menu-item-${index}`} onClick={() => setIsOpen(false)}>
                    {category.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === "de" ? "de" : "en-US") {
      i18n.changeLanguage(savedLanguage);
    }

    const getSocials = async () => {
      const socialMedia = await fetchSocial();
      setSocials(socialMedia);
    };
    getSocials();

    const getCategories = async () => {
      const blogPosts = await fetchBlogPosts(savedLanguage === "de" ? "de" : "en-US");
      const allCategories = blogPosts.flatMap(post => post.fields.categories);
      const uniqueCategories = Array.from(new Set(allCategories));
      setCategories(uniqueCategories);
    };
    getCategories();
  },[i18n.language]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const MenuModal = () => {

    return (
      <div className="fixed inset-0 z-50 bg-light dark:bg-grey dark:text-light p-5 w-full h-screen">
        <div className="flex justify-between">
          <img src={logo} alt="Biernath Legal Logo" className="h-16 w-16"/>
          <img src={isDarkMode() ? closingXWhite : closingX} alt="Close menu" className="h-8 w-8 m-4"/>
        </div>
        <div className="text-2xl md:text-4xl font-medium flex flex-col justify-center items-end my-auto h-full space-y-8">
          <div className="mb-32 flex flex-col items-end space-y-8 mx-8">
            {!isCategoryPage && (
                <div className="">
                  <button onClick={(e) => handleLanguageChange('en', e)} className={`language-button ${currentLanguage === 'en' ? 'font-bold' : ''}`}>EN/</button>
                  <button onClick={(e) => handleLanguageChange('de', e)} className={`language-button ${currentLanguage === 'de' ? 'font-bold' : ''}`}>DE</button>
                </div>
            )}
            <Link to="/home"><p>HOME</p></Link>
            <Link to="/about-us"><p>{t('navbar.about')}</p></Link>
            <CategoriesDropdown categories={categories}></CategoriesDropdown>
          </div>
          <Link to="/imprint" className="mx-8"><p>{t('navbar.imprint')}</p></Link>
          <Link to="/data-protection-policy" className="mx-8"><p>{t('navbar.data')}</p></Link>
          {socials.length > 0 ? (
            <div className='mt-32 flex flex-wrap justify-end mx-8'>
              {socials.length > 0 && socials.map(social => (
                <div className='w-1/2 md:w-1/4' key={social.sys.id}>
                  <Social title={social.fields.title} image={social.fields.icon.fields.file.url} link={social.fields.link}/>
                </div>
              ))}
            </div>
          ) : "" }
        </div>
      </div>
    );
  };

  return (
    <nav className="p-4 lg:p-8 xl:p-4 text-black">
      <div className="flex items-center justify-between">
        <Link to="/home"><img src={logo} alt="Biernath Legal Logo" className="h-12 w-12 md:h-16 md:w-16 rounded-full xl:max-w-none" /></Link>
        <div className="relative flex items-center md:w-2/3 md:mx-8">
          <FaSearch className="absolute left-3 lg:left-6 text-lg text-gray-400 dark:text-light" />
          <input
            type="text"
            placeholder={t('navbar.search')}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-3 py-3 lg:py-4 lg:pl-16 lg:text-lg rounded-lg dark:text-light md:w-full focus:border-blue-500 focus:outline-none dark:bg-light-grey dark:placeholder-light"
          />
        </div>
        <div className="hidden xl:block text-2xl md:text-4xl xl:text-2xl font-normal xl:flex items-center dark:text-light">
          {!isCategoryPage && (
              <div className="flex mr-8">
                <button onClick={(e) => handleLanguageChange('en', e)} className={`language-button ${currentLanguage === 'en' ? 'font-bold' : ''}`}>EN/</button>
                <button onClick={(e) => handleLanguageChange('de', e)} className={`language-button ${currentLanguage === 'de' ? 'font-bold' : ''}`}>DE</button>
              </div>
          )}
          <CategoriesDropdown categories={categories}></CategoriesDropdown>
          <Link to="/about-us" className="mr-8 whitespace-nowrap"><p>{t('navbar.about')}</p></Link>
          <Link to="/home" className="mr-8"><p>HOME</p></Link>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer xl:hidden">
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

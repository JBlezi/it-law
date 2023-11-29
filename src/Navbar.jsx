import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
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
      <div className="relative inline-block text-left">
        <div>
          <button type="button" onClick={toggleDropdown} className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
            Categories
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="py-1" role="none">
              {categories.map((category, index) => (
                <Link key={index} to={`/category/${category}`} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id={`menu-item-${index}`} onClick={() => setIsOpen(false)}>
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
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

    const getCategories = async () => {
      const blogPosts = await fetchBlogPosts(i18n.language);
      const allCategories = blogPosts.flatMap(post => post.fields.categories);
      const uniqueCategories = Array.from(new Set(allCategories));
      console.log("unique categories", uniqueCategories);
      setCategories(uniqueCategories);
    };
    getCategories();
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
            <CategoriesDropdown categories={categories}></CategoriesDropdown>
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
            className="pl-10 pr-3 py-3 rounded-lg dark:text-light focus:border-blue-500 focus:outline-none dark:bg-light-grey dark:placeholder-light"
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

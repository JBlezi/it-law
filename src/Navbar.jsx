import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from './images/biernath.com.favicon.png';
import hamburger from './images/hamburger.svg';
import closingX from './images/ClosingX.svg';
import { FaSearch } from 'react-icons/fa';
import { fetchSocial } from "./contentful";
import Social from "./Social";

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
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const getSocials = async () => {
      const socialMedia = await fetchSocial();
      setSocials(socialMedia);
    };
    getSocials();
  },[]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("onsearch", onSearch)
    onSearch(e.target.value);
  };

  const MenuModal = () => {

    return (
      <div className="fixed inset-0 z-50 bg-light p-5 w-full h-screen">
        <div className="flex justify-between">
          <img src={logo} alt="Close menu" className="h-12 w-12"/>
          <img src={closingX} alt="Close menu" className="h-8 w-8"/>
        </div>
        <div className="text-2xl font-medium flex flex-col justify-center items-end my-auto h-full space-y-8">
          <div className="mb-32 flex flex-col items-end space-y-8 mr-8">
            <Link to="/home"><p>HOME</p></Link>
            <Link to="/about-us"><p>ABOUT US</p></Link>
          </div>
          <Link to="/imprint" className="mr-8"><p>IMPRINT</p></Link>
          <Link to="/data-protection-policy" className="mr-8"><p>DATA PROTECTION POLICY</p></Link>
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
          <FaSearch className="absolute left-3 text-lg text-gray-400" />
          <input
            type="text"
            placeholder="Search posts"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-3 py-3 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer lg:hidden">
          {!isOpen ? (
              <img src={hamburger} alt="Open menu" className="h-10 w-10" />
          ) : (
              <MenuModal />
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

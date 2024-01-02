import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';


const Imprint = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-8 pt-12 text-grey dark:text-light lg:text-2xl">
      <Helmet>
        <title>{t('navbar.imprint')}</title>
        <meta name="description" content={t('imprint.description')} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className='text-3xl lg:text-5xl font-bold mb-8 lg:mb-16'>{t('navbar.imprint')}</h1>
      <p className="mb-4 lg:mb-4 font-bold mt-8 lg:mt-16">{t('imprint.imprint1').toUpperCase}</p>
      <p className="mb-4 lg:mb-4">{t('imprint.imprint2')}</p>
      <p className="">{t('imprint.imprint2a')}</p>
      <p className="mb-4 lg:mb-4">{t('imprint.imprint2b')}</p>
      <p className="mb-4 font-bold mt-8 lg:mt-16">{t('imprint.imprint3').toUpperCase()}</p>
      <p className="mb-4">{t('imprint.imprint4')}</p>
      <p className="">{t('imprint.imprint2a')}</p>
      <p className="mb-4 lg:mb-4">{t('imprint.imprint2b')}</p>
      <p className="mb-4 font-bold mt-8 lg:mt-16">{t('imprint.imprint5').toUpperCase()}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint6')}</p>
      <p className="mb-4 lg:mb-8 font-bold mt-8 lg:mt-16">{t('imprint.imprint7').toUpperCase()}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint8')}</p>
      <p className="mb-4 lg:mb-8 font-bold mt-8 lg:mt-16">{t('imprint.imprint9').toUpperCase()}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint10')}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint10a')}</p>
      <p className="mb-4 lg:mb-8 font-bold mt-8 lg:mt-16">{t('imprint.imprint12').toUpperCase()}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint13')}</p>
      <p className="mb-4 lg:mb-8 font-bold mt-8 lg:mt-16">{t('imprint.imprint14').toUpperCase()}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint15')}</p>
      <p className="mb-4 lg:mb-8 font-bold mt-8 lg:mt-16">{t('imprint.imprint16').toUpperCase()}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint17')}</p>
      <p className="mb-4 lg:mb-8 font-bold mt-8 lg:mt-16">{t('imprint.imprint18').toUpperCase()}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint19')}</p>
      <p className="mb-4 lg:mb-8">{t('imprint.imprint19a')}</p>
      <p className="mb-4 lg:mb-8 font-bold mt-8 lg:mt-16">{t('imprint.imprint20').toUpperCase()}</p>
      <p className="mb-16 lg:mb-32">{t('imprint.imprint21')}</p>
    </div>
  );
};

export default Imprint;

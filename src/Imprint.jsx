import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';


const Imprint = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-8 pt-12 text-grey dark:text-light">
      <Helmet>
        <title>{t('navbar.imprint')}</title>
        <meta name="description" content={t('imprint.description')} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className='text-4xl lg:text-5xl font-bold mb-4'>{t('navbar.imprint')}</h1>
    </div>
  );
};

export default Imprint;

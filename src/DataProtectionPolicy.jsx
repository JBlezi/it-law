import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const DataProtectionPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-8 pt-12 text-grey dark:text-light mb-16 lg:text-2xl">
      <Helmet>
        <title>{t('navbar.data')}</title>
        <meta name="description" content={t('data.description')}/>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className='text-3xl lg:text-5xl font-bold mb-8 lg:mb-16'>{t('navbar.data')}</h1>
      <p className="mb-4 lg:mb-4">{t('data.data1')}</p>
      <p className="mb-4 lg:mb-8">{t('data.data1a')}</p>
      <p className="mb-4 lg:mb-4 font-bold mt-8 lg:mt-16">{t('data.data2')}</p>
      <p className="mb-4 lg:mb-8">{t('data.data3')}</p>
      <p className="mb-4 lg:mb-4 font-bold mt-8 lg:mt-16">{t('data.data4')}</p>
      <p className="mb-4 lg:mb-8">{t('data.data5')}</p>
      <p className="mb-4 lg:mb-4 font-bold mt-8 lg:mt-16">{t('data.data6')}</p>
      <p className="mb-4 lg:mb-8">{t('data.data7')}</p>
    </div>
  );
};

export default DataProtectionPolicy;

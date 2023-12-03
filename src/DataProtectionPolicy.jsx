import React from 'react';
import { useTranslation } from 'react-i18next';

const DataProtectionPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-8 pt-12 text-grey dark:text-light">
      <h1 className='text-4xl lg:text-5xl font-bold mb-4'>{t('navbar.data')}</h1>
    </div>
  );
};

export default DataProtectionPolicy;

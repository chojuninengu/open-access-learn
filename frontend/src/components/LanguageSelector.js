import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-4 right-4">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="en">{t('english')}</option>
        <option value="fr">{t('french')}</option>
      </select>
    </div>
  );
}

export default LanguageSelector; 
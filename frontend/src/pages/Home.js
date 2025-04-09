import React from 'react';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">{t('welcome')}</h1>
      <p className="text-xl mb-4">GCE OL & AL Learning Platform</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Ordinary Level</h2>
          <p>Access OL curriculum and past questions</p>
        </div>
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Advanced Level</h2>
          <p>Access AL curriculum and past questions</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 
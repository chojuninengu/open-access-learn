import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Open Access Learn</h3>
            <p className="text-gray-300">
              GCE OL & AL Learning Platform
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quick-links')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/curriculum" className="text-gray-300 hover:text-white">
                  {t('curriculum')}
                </a>
              </li>
              <li>
                <a href="/past-questions" className="text-gray-300 hover:text-white">
                  {t('past-questions')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <p className="text-gray-300">
              Email: support@openaccesslearn.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Open Access Learn. {t('all-rights-reserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 
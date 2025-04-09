import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Settings() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    language: i18n.language,
    notifications: true,
    emailUpdates: true,
    darkMode: false
  });

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'language') {
      i18n.changeLanguage(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('settings')}</h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Language Settings */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-4">{t('language-settings')}</h2>
          <div className="flex items-center">
            <label className="mr-4">{t('preferred-language')}</label>
            <select
              name="language"
              value={settings.language}
              onChange={handleSettingChange}
              className="p-2 border rounded"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-4">{t('notification-settings')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label>{t('enable-notifications')}</label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleSettingChange}
                className="h-5 w-5 text-primary-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>{t('email-updates')}</label>
              <input
                type="checkbox"
                name="emailUpdates"
                checked={settings.emailUpdates}
                onChange={handleSettingChange}
                className="h-5 w-5 text-primary-600"
              />
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('display-settings')}</h2>
          <div className="flex items-center justify-between">
            <label>{t('dark-mode')}</label>
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleSettingChange}
              className="h-5 w-5 text-primary-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 
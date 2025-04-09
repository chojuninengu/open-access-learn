import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Curriculum() {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState('ordinary');
  const [selectedStream, setSelectedStream] = useState('sciences');

  const subjects = {
    ordinary: {
      sciences: ['Biology', 'Physics', 'Chemistry', 'Mathematics'],
      arts: ['English', 'French', 'History', 'Geography']
    },
    advanced: {
      sciences: ['Biology', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
      arts: ['English', 'French', 'History', 'Geography', 'Literature']
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('curriculum')}</h1>

      {/* Level Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('select-level')}</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedLevel('ordinary')}
            className={`px-4 py-2 rounded ${
              selectedLevel === 'ordinary'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t('ordinary-level')}
          </button>
          <button
            onClick={() => setSelectedLevel('advanced')}
            className={`px-4 py-2 rounded ${
              selectedLevel === 'advanced'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t('advanced-level')}
          </button>
        </div>
      </div>

      {/* Stream Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('select-stream')}</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedStream('sciences')}
            className={`px-4 py-2 rounded ${
              selectedStream === 'sciences'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t('sciences')}
          </button>
          <button
            onClick={() => setSelectedStream('arts')}
            className={`px-4 py-2 rounded ${
              selectedStream === 'arts'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t('arts')}
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects[selectedLevel][selectedStream].map((subject) => (
          <div
            key={subject}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-4">{subject}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('lessons')}</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('quizzes')}</span>
                <span className="font-medium">4</span>
              </div>
              <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700">
                {t('start-learning')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Curriculum; 
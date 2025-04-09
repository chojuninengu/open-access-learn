import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function PastQuestions() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    level: 'ordinary',
    subject: 'biology',
    year: '2023'
  });

  const years = Array.from({ length: 15 }, (_, i) => 2023 - i);
  const subjects = {
    ordinary: ['Biology', 'Physics', 'Chemistry', 'Mathematics', 'English', 'French'],
    advanced: ['Biology', 'Physics', 'Chemistry', 'Mathematics', 'English', 'French', 'Computer Science']
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('past-questions')}</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="level">
              {t('level')}
            </label>
            <select
              id="level"
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="ordinary">{t('ordinary-level')}</option>
              <option value="advanced">{t('advanced-level')}</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="subject">
              {t('subject')}
            </label>
            <select
              id="subject"
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              {subjects[filters.level].map(subject => (
                <option key={subject} value={subject.toLowerCase()}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="year">
              {t('year')}
            </label>
            <select
              id="year"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {[1, 2, 3].map((question) => (
          <div key={question} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Question {question}
            </h3>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="text-primary-600 hover:text-primary-700">
              {t('view-answer')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastQuestions; 
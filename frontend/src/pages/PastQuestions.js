import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { pastQuestionsService } from '../services/pastQuestionsService';
import LoadingSpinner from '../components/LoadingSpinner';

function PastQuestions() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    level: 'ordinary',
    subject: 'biology',
    year: '2023'
  });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Fetch available subjects when level changes
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjects = await pastQuestionsService.getAvailableSubjects(filters.level);
        setAvailableSubjects(subjects);
        if (!subjects.includes(filters.subject)) {
          setFilters(prev => ({ ...prev, subject: subjects[0] }));
        }
      } catch (err) {
        setError(t('error.fetching_subjects'));
      }
    };

    fetchSubjects();
  }, [filters.level, t]);

  // Fetch available years when subject changes
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const years = await pastQuestionsService.getAvailableYears(filters.level, filters.subject);
        setAvailableYears(years);
        if (!years.includes(parseInt(filters.year))) {
          setFilters(prev => ({ ...prev, year: years[0].toString() }));
        }
      } catch (err) {
        setError(t('error.fetching_years'));
      }
    };

    fetchYears();
  }, [filters.level, filters.subject, t]);

  // Fetch questions when filters change
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await pastQuestionsService.getPastQuestions(
          filters.level,
          filters.subject,
          filters.year
        );
        setQuestions(data);
      } catch (err) {
        setError(t('error.fetching_questions'));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [filters, t]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setSelectedQuestion(null);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
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
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableSubjects.map(subject => (
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
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleQuestionClick(question)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Question {question.id.split('-').pop()}
                  </h3>
                  <p className="text-gray-700 mb-4">{question.question}</p>
                </div>
                <span className="text-sm text-gray-500">{question.marks} marks</span>
              </div>
              {selectedQuestion?.id === question.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded">
                  <h4 className="font-semibold mb-2">Answer:</h4>
                  <p className="text-gray-700">{question.answer}</p>
                </div>
              )}
            </div>
          ))}
          {questions.length === 0 && (
            <div className="text-center text-gray-500">
              No questions available for the selected filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PastQuestions; 
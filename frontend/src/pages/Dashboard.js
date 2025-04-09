import React from 'react';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('dashboard')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Courses Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{t('my-courses')}</h2>
          <div className="space-y-4">
            <div className="border rounded p-4">
              <h3 className="font-medium">Biology - OL</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">60% {t('complete')}</p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{t('progress')}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{t('total-score')}</h3>
              <p className="text-2xl font-bold text-primary-600">850 {t('points')}</p>
            </div>
            <div>
              <h3 className="font-medium">{t('achievements')}</h3>
              <p className="text-2xl font-bold text-primary-600">5</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{t('recent-activity')}</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">Completed Biology Quiz</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">Started Physics Lesson</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 
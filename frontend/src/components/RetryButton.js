import React from 'react';
import { useTranslation } from 'react-i18next';

const RetryButton = ({ onClick, className = '' }) => {
    const { t } = useTranslation();
    
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`}
        >
            {t('common.retry')}
        </button>
    );
};

export default RetryButton; 
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

/**
 * A reusable retry button component for error states.
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler function
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} A retry button component
 */
const RetryButton = ({ onClick, className = '' }) => {
    const { t } = useTranslation();
    
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                       transition-colors ${className}`}
            aria-label={t('common.retry')}
        >
            {t('common.retry')}
        </button>
    );
};

RetryButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default RetryButton; 
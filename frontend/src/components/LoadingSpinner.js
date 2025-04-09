import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable loading spinner component with customizable sizes.
 * @component
 * @param {Object} props - Component props
 * @param {('sm'|'md'|'lg')} [props.size='md'] - The size of the spinner
 * @returns {JSX.Element} A loading spinner component
 */
const LoadingSpinner = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    return (
        <div 
            className="flex justify-center items-center"
            role="status"
            aria-label="Loading"
        >
            <div 
                className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-gray-900`}
                aria-hidden="true"
            />
        </div>
    );
};

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default LoadingSpinner; 
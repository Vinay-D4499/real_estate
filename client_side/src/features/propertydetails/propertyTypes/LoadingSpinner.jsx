import React from 'react';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[200px]">
        <div className="loader border-t-blue-500 w-12 h-12 rounded-full animate-spin"></div>
    </div>
);

export default LoadingSpinner;

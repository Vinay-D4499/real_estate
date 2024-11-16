import React from 'react';

const LoadingAnimation = ({ height = 'h-24', width = 'w-24' }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className={`${height} ${width} rounded-full border-t-8 border-b-8 border-gray-200`} />
                <div className={`absolute top-0 left-0 ${height} ${width} rounded-full border-t-8 border-b-8 border-blue-500 animate-spin`}></div>
            </div>
        </div>
    );
};

export default LoadingAnimation;

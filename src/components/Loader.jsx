import React from 'react';

const Loader = ({ fullScreen = true }) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 min-h-screen z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
        : "w-full h-full min-h-[200px] flex items-center justify-center";

    return (
        <div className={containerClasses}>
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-16 h-16 rounded-full border-4 border-purple-100 animate-spin border-t-purple-600"></div>

                {/* Inner Ring */}
                <div className="absolute top-1 left-1 w-14 h-14 rounded-full border-4 border-blue-100 animate-spin border-b-blue-500 animation-delay-200"></div>

                {/* Center Pulse */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default Loader;

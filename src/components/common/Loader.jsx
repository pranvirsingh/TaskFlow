import React from 'react';

const Loader = ({ fullScreen = true }) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 min-h-screen z-[1000] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300"
        : "w-full h-full min-h-[200px] flex flex-col items-center justify-center";

    return (
        <div className={containerClasses}>
            <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl">
                {/* <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl shadow-purple-500/10"> */}

                <div className="relative flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full animate-pulse"></div>

                    <div className="w-20 h-20 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] animate-[spin_2s_linear_infinite]"></div>

                    <div className="absolute w-14 h-14 rounded-full border-4 border-fuchsia-500/20 border-r-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.4)] animate-[spin_3s_linear_infinite_reverse]"></div>

                    <div className="absolute w-8 h-8 rounded-full border-4 border-white/20 border-b-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-[spin_1s_linear_infinite]"></div>

                    <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,1)] animate-pulse"></div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-lg font-black tracking-[0.3em] text-white/90 drop-shadow-md animate-pulse">
                        LOADING
                    </span>
                    <div className="flex gap-1.5 mt-1">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)] animate-[bounce_1s_infinite_0ms]"></div>
                        <div className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_5px_rgba(217,70,239,0.8)] animate-[bounce_1s_infinite_200ms]"></div>
                        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] animate-[bounce_1s_infinite_400ms]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;

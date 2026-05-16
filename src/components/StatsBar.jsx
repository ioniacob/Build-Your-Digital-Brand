import React from 'react';

const StatsBar = ({ count = 0 }) => {
  return (
    <div className="stats-bar flex justify-center gap-12 md:gap-24 flex-wrap">
      <div className="stat-item text-center">
        <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-accent-1 to-accent-2 bg-clip-text text-transparent">
          {count}
        </div>
        <div className="stat-label text-[0.7rem] text-white/50 uppercase tracking-widest mt-1">Total Prompts</div>
      </div>
      <div className="stat-item text-center">
        <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-accent-2 to-accent-3 bg-clip-text text-transparent">
          5+
        </div>
        <div className="stat-label text-[0.7rem] text-white/50 uppercase tracking-widest mt-1">Categories</div>
      </div>
      <div className="stat-item text-center">
        <div className="stat-number text-3xl font-extrabold bg-gradient-to-r from-accent-3 to-accent-5 bg-clip-text text-transparent">
          VIP
        </div>
        <div className="stat-label text-[0.7rem] text-white/50 uppercase tracking-widest mt-1">Access Level</div>
      </div>
    </div>
  );
};

export default StatsBar;

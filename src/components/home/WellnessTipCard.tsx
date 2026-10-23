import React from 'react';

export const WellnessTipCard: React.FC = () => {
  return (
    <>
      {/* Solo Living Wellness Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container p-4 flex items-center gap-3.5 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest shrink-0 overflow-hidden shadow-sm flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            alt="Warm cozy studio kitchen"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOFfalomKVq1WYmpEJ7hmhXJgfsWuJGLI-ZQl8OK2rb5YdoH65PZ2kK8-PgfVXOY2rcpdusFyUrkIbd_TeB6dqrJ3J3xhQ9-hQrHi7D5OPziwp-1jfXL1fzBO5uVSDYjsdnOCpJ4kRwT5xm2soTRKmGc7WZ37vNffTU_vCc77b01I7b5HCuhKRJV9pajyXKfHwT9PQ5R7UFewuPO3ZUfir1gR-Q1SCVm-4oDNMDMarv9ljZiAi4VhJjw"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-label-sm text-label-sm text-primary font-semibold">Solo Living Tip</span>
          <p className="font-body-sm text-body-sm text-on-surface truncate">Cooked at home 3 days in a row! Saved ~₩35,000.</p>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">chevron_right</span>
      </div>

      {/* Motivational Pocket Milestone Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-primary/10 via-secondary-container/20 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[22px]">savings</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-semibold">Weekly Goal Reached</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Kept daily average under ₩40k for 5 days</span>
          </div>
        </div>
        <span className="font-headline-sm text-headline-sm">🌱</span>
      </div>
    </>
  );
};

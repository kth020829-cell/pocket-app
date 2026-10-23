import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FabButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-20 z-40" style={{ right: 'max(1.25rem, calc(50% - 13.5rem + 1.25rem))' }}>
      <button
        onClick={() => navigate('/add')}
        aria-label="Add transaction"
        className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_10px_25px_-4px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
        type="button"
      >
        <span className="material-symbols-outlined text-[30px] font-bold">add</span>
      </button>
    </div>
  );
};

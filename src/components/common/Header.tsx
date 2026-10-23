import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenBudgetModal?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAddExpense = location.pathname === '/add';

  let subTitle = '';
  if (location.pathname === '/history') subTitle = 'History';
  else if (location.pathname === '/stats') subTitle = 'Stats';
  else if (location.pathname === '/goals') subTitle = 'Goals';

  if (isAddExpense) {
    return (
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
        <div className="h-16 px-gutter flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container/60 text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
          <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate px-space-sm">
            Pocket Add Expense
          </h1>
          <div className="w-11 h-11" />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
      <div className="h-16 px-gutter flex items-center justify-between">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-space-sm cursor-pointer select-none"
        >
          <img
            alt="Pocket App Icon"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1W3agjCMLlBlGzBq_Hl3kbgYBuM_97UkX6lnFpvMy7Qnxbm3D_VoBLuKEuChMwhmkDbCCEtBifcptOxXeEUhpxRqZKj1Q5jvW0TKE-J5GPfU0Nat2IBZBVdnjre2Tg55b4KcMKsHBYs5Tk3ZBAvuUUExdmrgcPc51k2C1TS0NFiz9X_wvGHkJlqTujjG5mehAk9kLxNN9j-8OH0TtIPnLpD7gdVfUMY3pThyDIQEVNtjHcfKZz0f59JXR8c"
          />
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
            Pocket
          </span>
          {subTitle && (
            <span className="font-label-md text-label-md text-on-surface-variant flex items-center">
              <span className="opacity-40 mx-1 font-normal">/</span>
              {subTitle}
            </span>
          )}
        </div>

        <button
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container/60 transition-colors"
          type="button"
          aria-label="Profile"
        >
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlicgzebLQ4_Eo0g8Q2iHQrFe3XMLFY94jZucMTijuPiScZEokOz6WiJV8emXmuMNYK7vCMXcc5xRH77_aoC5EMGkZURx6ikgQlXvIzx4-8ow3HgBqoAikrUrFQ0YWZd8eX_KXId23WBlSK11gplVt9eowO9mD3906WDroeoIjWwvWzhb3XGiuJMFSbIzo8RCKTojXwL2fF21MPiN-YYgwSLfY4CacyuwhuZxYz1bgmoaTppMC8x8K5Q"
          />
        </button>
      </div>
    </header>
  );
};

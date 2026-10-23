import React from 'react';
import { NavLink } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/history', label: 'History', icon: 'receipt_long' },
    { to: '/stats', label: 'Stats', icon: 'bar_chart' },
    { to: '/goals', label: 'Goals', icon: 'flag' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-surface-container-low">
      <div className="flex justify-around items-center h-16 px-space-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-space-xs transition-colors ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    isActive ? 'material-symbols-fill' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-label-sm text-label-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

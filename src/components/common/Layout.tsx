import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isAddExpense = location.pathname === '/add';

  return (
    <div className="min-h-screen bg-[#eaedf5] flex justify-center items-start">
      {/* Mobile viewport container */}
      <div className="w-full max-w-md min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased flex flex-col relative shadow-[0_0_30px_rgba(0,0,0,0.08)]">
        <Header />
        
        <main className={`flex-1 flex flex-col relative w-full pt-16 ${isAddExpense ? 'pb-safe' : 'pb-24'} bg-surface px-margin`}>
          <Outlet />
        </main>

        {!isAddExpense && <BottomNav />}
      </div>
    </div>
  );
};

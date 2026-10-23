import React, { useState } from 'react';
import { WelcomeBanner } from '../components/home/WelcomeBanner';
import { BudgetHeroCard } from '../components/home/BudgetHeroCard';
import { TodayInsightCard } from '../components/home/TodayInsightCard';
import { WellnessTipCard } from '../components/home/WellnessTipCard';
import { RecentTransactions } from '../components/home/RecentTransactions';
import { FabButton } from '../components/home/FabButton';
import { BudgetEditModal } from '../components/common/BudgetEditModal';

export const HomePage: React.FC = () => {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pb-6 space-y-5">
      <WelcomeBanner />
      
      <BudgetHeroCard onOpenEditModal={() => setIsBudgetModalOpen(true)} />
      
      <TodayInsightCard />
      
      <WellnessTipCard />
      
      <RecentTransactions />
      
      <FabButton />

      <BudgetEditModal 
        isOpen={isBudgetModalOpen} 
        onClose={() => setIsBudgetModalOpen(false)} 
      />
    </div>
  );
};

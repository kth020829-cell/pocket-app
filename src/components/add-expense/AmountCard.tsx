import React from 'react';

interface AmountCardProps {
  amount: number;
  onAddAmount: (delta: number) => void;
}

export const AmountCard: React.FC<AmountCardProps> = ({ amount, onAddAmount }) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        Amount Spent
      </div>

      <div className="flex items-baseline justify-center font-display-lg-mobile text-display-lg-mobile text-on-surface tracking-tight my-1">
        <span className="text-on-surface-variant mr-1 font-headline-md text-headline-md font-semibold select-none">
          ₩
        </span>
        <span className="font-bold tabular-nums">
          {amount.toLocaleString('ko-KR')}
        </span>
        <span className="inline-block w-0.5 h-7 bg-primary ml-1.5 rounded-full animate-pulse align-middle"></span>
      </div>

      {/* Quick Increment Chips */}
      <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar w-full justify-center">
        <button
          type="button"
          onClick={() => onAddAmount(1000)}
          className="px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm whitespace-nowrap active:scale-95 transition-all"
        >
          +₩1k
        </button>
        <button
          type="button"
          onClick={() => onAddAmount(5000)}
          className="px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm whitespace-nowrap active:scale-95 transition-all"
        >
          +₩5k
        </button>
        <button
          type="button"
          onClick={() => onAddAmount(10000)}
          className="px-2.5 py-1 rounded-full bg-secondary-container/40 hover:bg-secondary-container/60 text-secondary font-label-sm text-label-sm whitespace-nowrap active:scale-95 transition-all"
        >
          +₩10k
        </button>
        <button
          type="button"
          onClick={() => onAddAmount(50000)}
          className="px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm whitespace-nowrap active:scale-95 transition-all"
        >
          +₩50k
        </button>
      </div>
    </div>
  );
};

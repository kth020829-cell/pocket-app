import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../../store/useExpenseStore';
import { formatWon, formatShortDateOrTime } from '../../utils/formatters';

export const RecentTransactions: React.FC = () => {
  const navigate = useNavigate();
  const { transactions } = useExpenseStore();

  const recentList = transactions.slice(0, 5);

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'food':
        return 'bg-secondary-container/40';
      case 'cafe':
        return 'bg-tertiary-fixed/30';
      case 'transport':
        return 'bg-surface-container-high';
      case 'shopping':
        return 'bg-secondary-fixed/40';
      case 'bills':
        return 'bg-surface-container-high';
      default:
        return 'bg-surface-container-low';
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
            Recent Transactions
          </h2>
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
        </div>
        <button
          onClick={() => navigate('/history')}
          className="font-label-md text-label-md text-primary hover:text-secondary transition-colors"
          type="button"
        >
          See all
        </button>
      </div>

      <div className="rounded-2xl bg-surface-container-lowest p-2 shadow-[0_2px_12px_-2px_rgba(19,27,46,0.04)] flex flex-col divide-y divide-surface-container-low">
        {recentList.length > 0 ? (
          recentList.map((tx) => (
            <div
              key={tx.id}
              onClick={() => navigate('/history')}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl ${getCategoryBg(
                    tx.category
                  )} flex items-center justify-center shrink-0`}
                >
                  <span className="text-lg">{tx.categoryEmoji || '💰'}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                      {tx.categoryName}
                    </span>
                    {tx.tag && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-surface-container text-on-surface-variant truncate">
                        {tx.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {tx.memo}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 pl-2">
                <span className="font-label-lg text-label-lg text-on-surface font-bold tabular-nums">
                  -{formatWon(tx.amount)}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {formatShortDateOrTime(tx.date)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-on-surface-variant font-body-sm">
            No transactions yet. Click + to add your first expense!
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import { Transaction } from '../types/transaction';
import { formatWon, formatDateLabel, formatTime } from '../utils/formatters';
import { TransactionDetailModal } from '../components/history/TransactionDetailModal';

export const HistoryPage: React.FC = () => {
  const { transactions, deleteTransaction } = useExpenseStore();

  const now = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTx, setActiveTx] = useState<Transaction | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  // 1. Month filter
  const currentMonthTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const d = new Date(tx.date);
      return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
    });
  }, [transactions, selectedYear, selectedMonth]);

  // 2. Search & Category filter
  const filteredTransactions = useMemo(() => {
    return currentMonthTransactions.filter((tx) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'income' && tx.type === 'income') ||
        tx.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tx.memo.toLowerCase().includes(q) ||
        tx.categoryName.toLowerCase().includes(q) ||
        (tx.tag && tx.tag.toLowerCase().includes(q)) ||
        tx.paymentMethod.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [currentMonthTransactions, selectedCategory, searchQuery]);

  // Summary Metrics
  const totalOutflow = useMemo(() => {
    return currentMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [currentMonthTransactions]);

  const dailyAvg = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const isCurrent =
      now.getFullYear() === selectedYear && now.getMonth() === selectedMonth;
    const daysPassed = isCurrent ? now.getDate() : daysInMonth;
    return daysPassed > 0 ? Math.round(totalOutflow / daysPassed) : 0;
  }, [totalOutflow, selectedYear, selectedMonth, now]);

  // Group by Date String: YYYY-MM-DD
  const groupedTransactions = useMemo(() => {
    const groups: { [dateKey: string]: { dateStr: string; items: Transaction[]; total: number } } = {};

    filteredTransactions.forEach((tx) => {
      const d = new Date(tx.date);
      const dateKey = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

      if (!groups[dateKey]) {
        groups[dateKey] = {
          dateStr: tx.date,
          items: [],
          total: 0,
        };
      }
      groups[dateKey].items.push(tx);
      if (tx.type === 'expense') {
        groups[dateKey].total += tx.amount;
      }
    });

    // Sort groups descending
    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .map((key) => groups[key]);
  }, [filteredTransactions]);

  const filterChips = [
    { id: 'all', label: `All (${currentMonthTransactions.length})` },
    { id: 'food', label: 'Food 🍜' },
    { id: 'cafe', label: 'Cafe ☕' },
    { id: 'transport', label: 'Transport 🚇' },
    { id: 'shopping', label: 'Shopping 🛍️' },
    { id: 'bills', label: 'Rent/Bills 🏠' },
    { id: 'income', label: 'Income 💰' },
  ];

  return (
    <div className="flex flex-col w-full pb-6">
      {/* Top Control Center */}
      <section className="flex flex-col gap-space-md pt-space-xs mb-space-md">
        {/* Month Selector & Spending Summary Capsule */}
        <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <h2 className="font-headline-sm text-headline-sm tracking-tight font-semibold text-on-surface">
                {monthNames[selectedMonth]} {selectedYear}
              </h2>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next month"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>

            <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-md text-label-md font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              {filteredTransactions.length} items
            </span>
          </div>

          {/* Total Spending Tracker Cardlet */}
          <div className="flex items-center justify-between pt-space-xs">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                Monthly Net Outflow
              </span>
              <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface tracking-tight font-bold tabular-nums">
                {formatWon(totalOutflow)}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Daily Avg</span>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold tabular-nums">
                {formatWon(dailyAvg)}
              </span>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <div className="flex items-center w-full h-12 bg-surface-container-lowest rounded-full px-space-md shadow-sm border border-transparent focus-within:border-primary/40 transition-colors">
            <span className="material-symbols-outlined text-[20px] text-outline mr-space-sm">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memo, store, or tag..."
              className="flex-1 bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="text-outline hover:text-on-surface transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Filter Chips */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar -mx-margin px-margin py-0.5">
          {filterChips.map((chip) => {
            const isActive = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedCategory(chip.id)}
                className={`whitespace-nowrap px-space-md py-2 rounded-full font-label-md text-label-md transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Transaction Groups Container */}
      <div className="flex flex-col gap-space-lg">
        {groupedTransactions.length > 0 ? (
          groupedTransactions.map((group) => (
            <section key={group.dateStr} className="flex flex-col gap-space-sm">
              {/* Sticky Date Bar Header */}
              <div className="sticky top-16 z-20 flex items-center justify-between py-1 bg-surface/90 backdrop-blur-md">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
                    {formatDateLabel(group.dateStr)}
                  </h3>
                </div>
                <span className="px-space-sm py-0.5 rounded-full bg-surface-container font-label-md text-label-md text-on-surface-variant font-semibold tabular-nums">
                  -{formatWon(group.total)}
                </span>
              </div>

              {/* Item Card Stack */}
              <div className="flex flex-col gap-space-xs">
                {group.items.map((tx) => (
                  <article
                    key={tx.id}
                    onClick={() => setActiveTx(tx)}
                    className="flex items-center justify-between p-space-md bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-space-md min-w-0 flex-1 pr-space-sm">
                      <div className="w-11 h-11 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-xl">
                        {tx.categoryEmoji || '💰'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                          {tx.categoryName}
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          {tx.memo}
                        </p>
                        <div className="flex items-center gap-space-xs mt-1">
                          {tx.tag && (
                            <>
                              <span className="px-space-xs py-0.5 rounded-md bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm font-medium">
                                {tx.tag}
                              </span>
                              <span className="text-outline text-[10px]">•</span>
                            </>
                          )}
                          <span className="font-body-sm text-body-sm text-outline">
                            {formatTime(tx.date)}
                          </span>
                          <span className="text-outline text-[10px]">•</span>
                          <span className="font-body-sm text-body-sm text-outline truncate">
                            {tx.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tabular-nums">
                        -{formatWon(tx.amount)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          /* Empty State */
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-[32px]">receipt_long</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-headline-sm text-on-surface font-semibold">No Transactions Found</h4>
              <p className="font-body-sm text-on-surface-variant mt-1">
                조건에 맞는 지출 내역이 없습니다.
              </p>
            </div>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-primary-container text-on-primary font-label-sm font-semibold hover:brightness-105 active:scale-95 transition-all shadow-sm"
              >
                필터 초기화
              </button>
            )}
          </div>
        )}
      </div>

      {/* Item Detail / Delete Modal */}
      <TransactionDetailModal
        transaction={activeTx}
        onClose={() => setActiveTx(null)}
        onDelete={(id) => deleteTransaction(id)}
      />
    </div>
  );
};

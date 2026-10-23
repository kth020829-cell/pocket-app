import React, { useState, useMemo } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import { getMonthlySpending, getSixMonthTrend } from '../utils/calculations';
import { formatWon } from '../utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

export const StatsPage: React.FC = () => {
  const { transactions } = useExpenseStore();

  const now = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());

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

  // 1. Current Month Data
  const { total: currentTotal, dailyAvg, byCategory } = useMemo(() => {
    return getMonthlySpending(transactions, selectedYear, selectedMonth);
  }, [transactions, selectedYear, selectedMonth]);

  // 2. Previous Month Data for comparison
  const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
  const prevYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
  const { total: prevTotal } = useMemo(() => {
    return getMonthlySpending(transactions, prevYear, prevMonth);
  }, [transactions, prevYear, prevMonth]);

  const diffPercent = prevTotal > 0
    ? Math.round(((currentTotal - prevTotal) / prevTotal) * 100)
    : 0;

  // 3. Category Data for Donut Chart & Ranking
  const categoryColors: Record<string, string> = {
    food: '#10B981',      // Emerald Mint
    shopping: '#818CF8',  // Indigo
    bills: '#FB7185',     // Rose
    cafe: '#FBBF24',      // Amber
    transport: '#38BDF8', // Sky Blue
    etc: '#94A3B8',       // Slate
  };

  const categoryRanking = useMemo(() => {
    const list = Object.entries(byCategory).map(([catKey, data]) => {
      const percent = currentTotal > 0 ? (data.total / currentTotal) * 100 : 0;
      return {
        key: catKey,
        name: data.name,
        emoji: data.emoji,
        total: data.total,
        count: data.count,
        percent: Math.round(percent * 10) / 10,
        color: categoryColors[catKey] || '#94A3B8',
      };
    });

    return list.sort((a, b) => b.total - a.total);
  }, [byCategory, currentTotal]);

  // 4. 6-Month Trend Data
  const sixMonthData = useMemo(() => {
    return getSixMonthTrend(transactions, selectedYear, selectedMonth);
  }, [transactions, selectedYear, selectedMonth]);

  const sixMonthAvg = useMemo(() => {
    const sum = sixMonthData.reduce((acc, curr) => acc + curr.total, 0);
    return Math.round(sum / (sixMonthData.length || 1));
  }, [sixMonthData]);

  // Tip calculation
  const isBelowAvg = currentTotal < sixMonthAvg;
  const avgDiffPercent = sixMonthAvg > 0 ? Math.abs(Math.round(((currentTotal - sixMonthAvg) / sixMonthAvg) * 100)) : 0;

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Month Selector & Quick Navigation Pill */}
      <div className="flex items-center justify-between py-space-sm mb-space-sm">
        <button
          type="button"
          onClick={handlePrevMonth}
          aria-label="Previous month"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
            chevron_left
          </span>
        </button>

        <div className="flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest shadow-sm">
          <span className="material-symbols-outlined text-[18px] text-primary material-symbols-fill">
            calendar_today
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            {monthNames[selectedMonth]} {selectedYear}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          aria-label="Next month"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
            chevron_right
          </span>
        </button>
      </div>

      {/* High-Level Metric Summary Card */}
      <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-space-lg shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] mb-space-lg">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-label-md text-label-md text-on-surface-variant">
            Total Spent this month
          </span>
          <span className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
            diffPercent <= 0
              ? 'bg-secondary-fixed text-on-secondary-fixed'
              : 'bg-error-container text-on-error-container'
          }`}>
            <span className="material-symbols-outlined text-[15px] leading-none">
              {diffPercent <= 0 ? 'trending_down' : 'trending_up'}
            </span>
            {Math.abs(diffPercent)}% vs {monthNames[prevMonth].slice(0, 3)}
          </span>
        </div>

        <div className="flex items-baseline gap-space-xs mb-space-sm">
          <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface tracking-tight font-bold tabular-nums">
            {formatWon(currentTotal)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-space-sm bg-surface-container-low/60 rounded-2xl px-space-md py-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Daily average:</span>
          </div>
          <span className="font-label-lg text-label-lg text-on-surface font-semibold tabular-nums">
            {formatWon(dailyAvg)} / day
          </span>
        </div>
      </div>

      {/* Donut Chart Section ("Spending by Category") */}
      <div className="rounded-3xl bg-surface-container-lowest p-space-lg shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] mb-space-lg">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Spending Breakdown
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {categoryRanking.length} active spending categories
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">pie_chart</span>
          </div>
        </div>

        {/* Chart Visual */}
        {categoryRanking.length > 0 ? (
          <div className="relative flex items-center justify-center py-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryRanking}
                  dataKey="total"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={80}
                  paddingAngle={3}
                  cornerRadius={4}
                >
                  {categoryRanking.map((entry) => (
                    <Cell key={entry.key} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Hole Content */}
            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Total
              </span>
              <span className="font-headline-md text-headline-md text-on-surface mt-0.5 tracking-tight font-bold tabular-nums">
                {currentTotal >= 1000000
                  ? `₩${(currentTotal / 1000000).toFixed(1)}M`
                  : `₩${Math.round(currentTotal / 1000)}k`}
              </span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                100%
              </span>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-on-surface-variant font-body-sm">
            이번 달 지출 내역이 없습니다.
          </div>
        )}

        {/* Legend Chips */}
        {categoryRanking.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-space-md pt-space-sm bg-surface-container-low/50 rounded-2xl p-space-sm">
            {categoryRanking.map((cat) => (
              <div key={cat.key} className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                ></span>
                <span className="font-label-sm text-label-sm text-on-surface truncate">
                  {cat.name} {Math.round(cat.percent)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Ranking List */}
      {categoryRanking.length > 0 && (
        <div className="rounded-3xl bg-surface-container-lowest p-space-lg shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] mb-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Top Categories
            </h2>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <span>Ranked</span>
              <span className="material-symbols-outlined text-[16px]">sort</span>
            </div>
          </div>

          <div className="flex flex-col gap-space-md">
            {categoryRanking.map((cat) => (
              <div key={cat.key} className="group flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-[18px]"
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                    >
                      {cat.emoji}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-lg text-label-lg text-on-surface truncate font-semibold">
                          {cat.name}
                        </span>
                        <span
                          className="px-1.5 py-0.5 rounded-md font-label-sm text-[10px] font-semibold"
                          style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
                        >
                          {cat.percent}%
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {cat.count} txns
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                      {formatWon(cat.total)}
                    </div>
                  </div>
                </div>

                {/* Progress Meter */}
                <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6-Month Comparison ("Monthly Trend" / Bar Chart) */}
      <div className="rounded-3xl bg-surface-container-lowest p-space-lg shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] mb-space-lg">
        <div className="flex items-center justify-between mb-space-xs">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            6-Month Trend
          </h2>
          <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="w-2 h-0.5 bg-outline-variant rounded-full"></span>
            <span>Avg: ₩{Math.round(sixMonthAvg / 1000)}k</span>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          Comparing {sixMonthData[0]?.monthName} through {sixMonthData[sixMonthData.length - 1]?.monthName}
        </p>

        {/* Recharts Bar Chart */}
        <div className="relative pt-2 pb-2 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sixMonthData} margin={{ top: 15, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="monthName"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#3c4a42', fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip
                formatter={(value: number) => [formatWon(value), 'Spent']}
                cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #dae2fd',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                {sixMonthData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={entry.isTarget ? '#10B981' : '#e2e7ff'}
                    style={{
                      filter: entry.isTarget
                        ? 'drop-shadow(0 6px 12px rgba(16,185,129,0.3))'
                        : 'none',
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Solo Saver Insight Card */}
        <div className="mt-space-md p-space-md rounded-2xl bg-secondary-fixed/30 flex items-start gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface mb-0.5 font-semibold">
              Mindful Solo Saver Tip
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {isBelowAvg ? (
                <>
                  You are spending <strong className="text-on-surface font-semibold">{avgDiffPercent}% below</strong> your 6-month average! Great job preparing meals at home; your discretionary expenses dropped significantly.
                </>
              ) : (
                <>
                  You are spending <strong className="text-on-surface font-semibold">{avgDiffPercent}% above</strong> your 6-month average. Check your dining and shopping categories to stay comfortably on track!
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

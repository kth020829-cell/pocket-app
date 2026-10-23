import { Transaction } from '../types/transaction';

export function getMonthDaysInfo(year: number, month: number) {
  // month: 0-indexed
  const now = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = (now.getFullYear() === year && now.getMonth() === month) ? now.getDate() : daysInMonth;
  const daysLeft = Math.max(1, daysInMonth - currentDay);
  return { daysInMonth, currentDay, daysLeft };
}

export function filterTransactionsByMonth(transactions: Transaction[], year: number, month: number): Transaction[] {
  return transactions.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

export function getTodaySpending(transactions: Transaction[]): { total: number; byCategory: { [cat: string]: number } } {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const todayEnd = todayStart + 24 * 60 * 60 * 1000;

  const todayTxs = transactions.filter(t => {
    if (t.type !== 'expense') return false;
    const time = new Date(t.date).getTime();
    return time >= todayStart && time < todayEnd;
  });

  const total = todayTxs.reduce((sum, t) => sum + t.amount, 0);
  const byCategory: { [cat: string]: number } = {};

  todayTxs.forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });

  return { total, byCategory };
}

export function getMonthlySpending(transactions: Transaction[], year: number, month: number): {
  total: number;
  dailyAvg: number;
  byCategory: { [cat: string]: { total: number; count: number; name: string; emoji: string } };
} {
  const monthTxs = filterTransactionsByMonth(transactions, year, month).filter(t => t.type === 'expense');
  const total = monthTxs.reduce((sum, t) => sum + t.amount, 0);
  
  const { currentDay } = getMonthDaysInfo(year, month);
  const dailyAvg = currentDay > 0 ? Math.round(total / currentDay) : 0;

  const byCategory: { [cat: string]: { total: number; count: number; name: string; emoji: string } } = {};

  monthTxs.forEach(t => {
    if (!byCategory[t.category]) {
      byCategory[t.category] = {
        total: 0,
        count: 0,
        name: t.categoryName,
        emoji: t.categoryEmoji,
      };
    }
    byCategory[t.category].total += t.amount;
    byCategory[t.category].count += 1;
  });

  return { total, dailyAvg, byCategory };
}

export function getSixMonthTrend(transactions: Transaction[], targetYear: number, targetMonth: number): {
  monthName: string;
  year: number;
  month: number;
  total: number;
  isTarget: boolean;
}[] {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result = [];

  for (let i = 5; i >= 0; i--) {
    let m = targetMonth - i;
    let y = targetYear;
    while (m < 0) {
      m += 12;
      y -= 1;
    }
    const monthTxs = filterTransactionsByMonth(transactions, y, m).filter(t => t.type === 'expense');
    const total = monthTxs.reduce((sum, t) => sum + t.amount, 0);
    result.push({
      monthName: monthNames[m],
      year: y,
      month: m,
      total,
      isTarget: i === 0,
    });
  }

  return result;
}

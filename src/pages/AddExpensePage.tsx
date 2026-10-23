import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore';
import { ExpenseCategory, TransactionType } from '../types/transaction';
import { AmountCard } from '../components/add-expense/AmountCard';
import { CategoryGrid } from '../components/add-expense/CategoryGrid';
import { DetailsCard } from '../components/add-expense/DetailsCard';
import { NumberKeypad } from '../components/add-expense/NumberKeypad';

export const AddExpensePage: React.FC = () => {
  const navigate = useNavigate();
  const { addTransaction } = useExpenseStore();

  const [txType, setTxType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<number>(15000);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('food');
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [paymentMethod, setPaymentMethod] = useState<string>('Toss Check Card');
  const [memo, setMemo] = useState<string>('');
  const [isSoloEssential, setIsSoloEssential] = useState<boolean>(true);

  const handleAddAmount = (delta: number) => {
    setAmount((prev) => Math.min(99999999, prev + delta));
  };

  const handleKeyPress = (key: string) => {
    if (key === 'back') {
      const str = amount.toString().slice(0, -1);
      setAmount(str.length > 0 ? parseInt(str, 10) : 0);
    } else if (key === '00') {
      if (amount > 0 && amount < 1000000) {
        setAmount(parseInt(amount.toString() + '00', 10));
      }
    } else {
      const str = amount === 0 ? key : amount.toString() + key;
      if (str.length <= 8) {
        setAmount(parseInt(str, 10));
      }
    }
  };

  const handleClear = () => {
    setAmount(0);
    setMemo('');
  };

  const categoryDetails: Record<ExpenseCategory, { name: string; emoji: string }> = {
    food: { name: 'Food', emoji: '🍜' },
    cafe: { name: 'Cafe', emoji: '☕' },
    transport: { name: 'Transport', emoji: '🚇' },
    shopping: { name: 'Shop', emoji: '🛍️' },
    bills: { name: 'Bills', emoji: '🏠' },
    etc: { name: 'More', emoji: '✨' },
  };

  const handleSave = () => {
    if (amount <= 0) {
      alert('금액을 0원보다 크게 입력해주세요.');
      return;
    }

    const catInfo = categoryDetails[selectedCategory] || { name: 'Other', emoji: '✨' };

    addTransaction({
      type: txType,
      amount,
      category: selectedCategory,
      categoryName: catInfo.name,
      categoryEmoji: catInfo.emoji,
      memo: memo.trim() || `${catInfo.name} 지출`,
      paymentMethod,
      date,
      isSoloEssential,
    });

    navigate('/');
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Segmented Type Selector & Quick Reset */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex bg-surface-container p-1 rounded-full flex-1 max-w-[260px]">
          <button
            type="button"
            onClick={() => setTxType('expense')}
            className={`flex-1 py-1.5 px-3 rounded-full text-center font-label-md text-label-md transition-all ${
              txType === 'expense'
                ? 'bg-surface-container-lowest shadow-sm text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setTxType('income')}
            className={`flex-1 py-1.5 px-3 rounded-full text-center font-label-md text-label-md transition-all ${
              txType === 'income'
                ? 'bg-surface-container-lowest shadow-sm text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setTxType('transfer')}
            className={`flex-1 py-1.5 px-3 rounded-full text-center font-label-md text-label-md transition-all ${
              txType === 'transfer'
                ? 'bg-surface-container-lowest shadow-sm text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Transfer
          </button>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface font-label-md text-label-md rounded-full hover:bg-surface-container-high transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          Clear
        </button>
      </div>

      {/* Hero Amount Card */}
      <AmountCard amount={amount} onAddAmount={handleAddAmount} />

      {/* Interactive Category Picker */}
      <CategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Context & Details Card */}
      <DetailsCard
        date={date}
        onChangeDate={setDate}
        paymentMethod={paymentMethod}
        onChangePaymentMethod={setPaymentMethod}
        memo={memo}
        onChangeMemo={setMemo}
        isSoloEssential={isSoloEssential}
        onToggleSoloEssential={setIsSoloEssential}
      />

      {/* Custom Tactile Number Keypad */}
      <NumberKeypad
        amount={amount}
        onKeyPress={handleKeyPress}
        onSave={handleSave}
      />
    </div>
  );
};

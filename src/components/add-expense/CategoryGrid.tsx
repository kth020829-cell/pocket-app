import React from 'react';
import { ExpenseCategory } from '../../types/transaction';

interface CategoryGridProps {
  selectedCategory: ExpenseCategory;
  onSelectCategory: (cat: ExpenseCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: {
    id: ExpenseCategory;
    name: string;
    emoji: string;
  }[] = [
    { id: 'food', name: 'Food', emoji: '🍜' },
    { id: 'cafe', name: 'Cafe', emoji: '☕' },
    { id: 'transport', name: 'Transit', emoji: '🚇' },
    { id: 'shopping', name: 'Shop', emoji: '🛍️' },
    { id: 'bills', name: 'Bills', emoji: '🏠' },
    { id: 'etc', name: 'More', emoji: '✨' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <span className="font-label-md text-label-md text-on-surface font-semibold">
          Select Category
        </span>
        <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Solo Essentials
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {categories.map((c) => {
          const isSelected = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCategory(c.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all transform active:scale-90 ${
                isSelected
                  ? 'bg-secondary-container/30 text-secondary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] transition-all ${
                  isSelected
                    ? 'bg-surface-container-lowest shadow-sm'
                    : 'bg-surface-container'
                }`}
              >
                {c.emoji}
              </div>
              <span
                className={`font-label-sm text-label-sm truncate max-w-full ${
                  isSelected ? 'font-semibold' : 'font-medium'
                }`}
              >
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

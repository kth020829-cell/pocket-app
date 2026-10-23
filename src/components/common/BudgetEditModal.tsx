import React, { useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';

interface BudgetEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetEditModal: React.FC<BudgetEditModalProps> = ({ isOpen, onClose }) => {
  const { budgetConfig, updateBudget } = useExpenseStore();
  const [budgetVal, setBudgetVal] = useState<number>(budgetConfig.monthlyBudget);

  if (!isOpen) return null;

  const handleSave = () => {
    if (budgetVal >= 0) {
      updateBudget(budgetVal);
    }
    onClose();
  };

  const presetAmounts = [500000, 800000, 1000000, 1200000, 1500000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-sm rounded-2xl bg-surface-container-lowest p-6 shadow-xl border border-surface-container flex flex-col gap-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">account_balance_wallet</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              월 예산 설정
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          한 달 동안 사용할 목표 예산 금액을 설정하세요. 홈 화면의 남은 잔액과 소비 페이스가 실시간 갱신됩니다.
        </p>

        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            월 예산 금액
          </label>
          <div className="flex items-center gap-2 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 focus-within:border-primary">
            <span className="font-headline-md font-semibold text-primary">₩</span>
            <input
              type="text"
              value={budgetVal.toLocaleString('ko-KR')}
              onChange={(e) => {
                const num = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                setBudgetVal(num);
              }}
              className="w-full bg-transparent font-headline-md font-bold text-on-surface focus:outline-none tabular-nums"
              placeholder="1,000,000"
            />
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-1.5">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setBudgetVal(amt)}
              className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                budgetVal === amt
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ₩{(amt / 10000).toLocaleString('ko-KR')}만
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg font-medium transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 rounded-full bg-primary-container text-on-primary font-label-lg font-semibold hover:brightness-105 active:scale-95 transition-all shadow-md"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

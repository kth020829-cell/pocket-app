import React, { useState } from 'react';
import { Goal } from '../../types/goal';
import { formatWon } from '../../utils/formatters';

interface DepositModalProps {
  goal: Goal | null;
  onClose: () => void;
  onDeposit: (goalId: string, amount: number) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  goal,
  onClose,
  onDeposit,
}) => {
  const [depositAmount, setDepositAmount] = useState<number>(50000);

  if (!goal) return null;

  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

  const presets = [10000, 30000, 50000, 100000, remaining];

  const handleSave = () => {
    if (depositAmount <= 0) {
      alert('0원보다 큰 금액을 입력해주세요.');
      return;
    }
    onDeposit(goal.id, depositAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-sm rounded-2xl bg-surface-container-lowest p-6 shadow-xl border border-surface-container flex flex-col gap-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{goal.categoryEmoji}</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate max-w-[190px]">
                {goal.title}
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                남은 목표: {formatWon(remaining)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            적립할 금액
          </label>
          <div className="flex items-center gap-2 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 focus-within:border-primary">
            <span className="font-headline-md font-semibold text-primary">₩</span>
            <input
              type="text"
              value={depositAmount.toLocaleString('ko-KR')}
              onChange={(e) => {
                const num = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                setDepositAmount(num);
              }}
              className="w-full bg-transparent font-headline-md font-bold text-on-surface focus:outline-none tabular-nums"
              placeholder="50,000"
            />
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-1.5">
          {presets.map((amt, idx) => {
            const isAll = idx === presets.length - 1;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setDepositAmount(amt)}
                className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                  depositAmount === amt
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {isAll ? '전액 완납' : `+₩${(amt / 10000).toLocaleString('ko-KR')}만`}
              </button>
            );
          })}
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
            className="flex-1 py-3 rounded-full bg-primary-container text-on-primary font-label-lg font-semibold hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">savings</span>
            <span>적립하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

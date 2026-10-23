import React, { useState } from 'react';
import { Goal } from '../../types/goal';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
  isOpen,
  onClose,
  onAddGoal,
}) => {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState<number>(1000000);
  const [categoryName, setCategoryName] = useState('Tech & Gadgets');
  const [categoryEmoji, setCategoryEmoji] = useState('💻');
  const [targetDate, setTargetDate] = useState('2026-12-31');

  if (!isOpen) return null;

  const iconOptions = [
    { emoji: '💻', name: 'Tech & Gadgets' },
    { emoji: '✈️', name: 'Travel & Vacation' },
    { emoji: '🛡️', name: 'Emergency Fund' },
    { emoji: '🪑', name: 'Home & Furniture' },
    { emoji: '📚', name: 'Study & Self Care' },
    { emoji: '🎁', name: 'Special Gift' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('목표 이름을 입력해주세요.');
      return;
    }
    if (targetAmount <= 0) {
      alert('목표 금액은 0원보다 커야 합니다.');
      return;
    }

    onAddGoal({
      title: title.trim(),
      categoryName,
      categoryEmoji,
      targetAmount,
      targetDate,
      monthlyPace: Math.round(targetAmount / 6),
      theme: 'primary',
    });

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
            <span className="material-symbols-outlined text-primary text-[24px]">flag</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              새 저축 목표 만들기
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              목표 이름
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: M3 맥북 프로, 제주도 여행"
              className="p-3 bg-surface-container-low rounded-xl text-on-surface font-body-md border border-outline-variant/30 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              아이콘 & 카테고리
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {iconOptions.map((opt) => (
                <button
                  key={opt.emoji}
                  type="button"
                  onClick={() => {
                    setCategoryEmoji(opt.emoji);
                    setCategoryName(opt.name);
                  }}
                  className={`p-2 rounded-xl flex items-center gap-1.5 transition-all text-left ${
                    categoryEmoji === opt.emoji
                      ? 'bg-secondary-container/40 border border-primary text-primary font-semibold'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  <span className="text-xl">{opt.emoji}</span>
                  <span className="font-label-sm text-label-sm truncate">{opt.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              목표 금액
            </label>
            <div className="flex items-center gap-2 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 focus-within:border-primary">
              <span className="font-headline-sm font-semibold text-primary">₩</span>
              <input
                type="text"
                value={targetAmount.toLocaleString('ko-KR')}
                onChange={(e) => {
                  const num = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                  setTargetAmount(num);
                }}
                className="w-full bg-transparent font-headline-sm font-bold text-on-surface focus:outline-none tabular-nums"
                placeholder="1,000,000"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              목표 달성 기한
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="p-3 bg-surface-container-low rounded-xl text-on-surface font-body-md border border-outline-variant/30 focus:outline-none focus:border-primary"
            />
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
              type="submit"
              className="flex-1 py-3 rounded-full bg-primary-container text-on-primary font-label-lg font-semibold hover:brightness-105 active:scale-95 transition-all shadow-md"
            >
              목표 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

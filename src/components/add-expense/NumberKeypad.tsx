import React from 'react';

interface NumberKeypadProps {
  amount: number;
  onKeyPress: (key: string) => void;
  onSave: () => void;
}

export const NumberKeypad: React.FC<NumberKeypadProps> = ({
  amount,
  onKeyPress,
  onSave,
}) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'back'];

  return (
    <div className="space-y-3 pt-1 select-none">
      <div className="grid grid-cols-3 gap-2">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onKeyPress(k)}
            className="h-12 bg-surface-container-lowest hover:bg-surface-container-high rounded-xl flex items-center justify-center font-headline-md text-headline-md font-semibold text-on-surface shadow-sm active:scale-95 transition-all"
          >
            {k === 'back' ? (
              <span className="material-symbols-outlined text-[22px] text-on-surface-variant">
                backspace
              </span>
            ) : (
              k
            )}
          </button>
        ))}
      </div>

      {/* Primary CTA Button in Thumb Zone */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onSave}
          className="w-full h-14 bg-primary-container text-on-surface hover:brightness-105 active:scale-[0.98] transition-all rounded-full flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.25)] font-headline-sm text-headline-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{amount > 0 ? `Save ₩${amount.toLocaleString('ko-KR')}` : 'Save Expense'}</span>
        </button>
      </div>
    </div>
  );
};

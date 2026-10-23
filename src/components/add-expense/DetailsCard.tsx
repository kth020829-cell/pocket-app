import React, { useState } from 'react';

interface DetailsCardProps {
  date: string;
  onChangeDate: (date: string) => void;
  paymentMethod: string;
  onChangePaymentMethod: (method: string) => void;
  memo: string;
  onChangeMemo: (memo: string) => void;
  isSoloEssential: boolean;
  onToggleSoloEssential: (val: boolean) => void;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  date,
  onChangeDate,
  paymentMethod,
  onChangePaymentMethod,
  memo,
  onChangeMemo,
  isSoloEssential,
  onToggleSoloEssential,
}) => {
  const [showPaymentSelector, setShowPaymentSelector] = useState(false);

  const paymentOptions = [
    'Toss Check Card',
    'Transit Card',
    'KakaoPay',
    'Shinhan Card',
    'Hyundai Card',
    'Auto Debit',
    'Cash',
  ];

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const currentDateObj = new Date(date);
  const isToday = date.startsWith(todayStr);
  const isYesterday = date.startsWith(yesterdayStr);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const displayDateText = isToday
    ? `Today, ${monthNames[currentDateObj.getMonth()]} ${currentDateObj.getDate()}`
    : isYesterday
    ? `Yesterday, ${monthNames[currentDateObj.getMonth()]} ${currentDateObj.getDate()}`
    : `${monthNames[currentDateObj.getMonth()]} ${currentDateObj.getDate()}, ${currentDateObj.getFullYear()}`;

  const setDateToDay = (type: 'today' | 'yesterday') => {
    const target = new Date();
    if (type === 'yesterday') {
      target.setDate(target.getDate() - 1);
    }
    onChangeDate(target.toISOString());
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm space-y-3.5">
      {/* Date & Fast Pills */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant leading-none">Date</p>
            <p className="font-label-lg text-label-lg text-on-surface font-semibold pt-0.5">
              {displayDateText}
            </p>
          </div>
        </div>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setDateToDay('yesterday')}
            className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm active:scale-95 transition-all ${
              isYesterday
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Yesterday
          </button>
          <button
            type="button"
            onClick={() => setDateToDay('today')}
            className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm active:scale-95 transition-all ${
              isToday
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Today
          </button>
        </div>
      </div>

      {/* Payment Account */}
      <div className="relative">
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">credit_card</span>
            </div>
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant leading-none">Payment Source</p>
              <p className="font-label-lg text-label-lg text-on-surface font-semibold pt-0.5">
                {paymentMethod}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPaymentSelector(!showPaymentSelector)}
            className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span>Change</span>
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">expand_more</span>
          </button>
        </div>

        {/* Dropdown for payment methods */}
        {showPaymentSelector && (
          <div className="absolute right-0 top-12 z-20 w-48 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container p-1 space-y-0.5 animate-scale-up">
            {paymentOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChangePaymentMethod(opt);
                  setShowPaymentSelector(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg font-label-sm text-label-sm flex items-center justify-between transition-colors ${
                  paymentMethod === opt
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span>{opt}</span>
                {paymentMethod === opt && (
                  <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Memo Input */}
      <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl">
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">edit_note</span>
        <input
          type="text"
          value={memo}
          onChange={(e) => onChangeMemo(e.target.value)}
          placeholder="e.g., Emart grocery, cold brew with friend"
          className="bg-transparent text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md w-full focus:outline-none"
        />
      </div>

      {/* Solo Living Feature Toggle */}
      <div className="flex items-center justify-between bg-surface-container-low/70 px-3 py-2.5 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-tertiary">cottage</span>
          <div>
            <p className="font-label-md text-label-md text-on-surface leading-tight font-semibold">Living Solo Essential</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Exclude from discretionary leisure quota</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isSoloEssential}
            onChange={(e) => onToggleSoloEssential(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
    </div>
  );
};

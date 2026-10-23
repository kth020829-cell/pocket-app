import React from 'react';
import { Transaction } from '../../types/transaction';
import { formatWon, formatDateLabel, formatTime } from '../../utils/formatters';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  onDelete,
}) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-sm rounded-2xl bg-surface-container-lowest p-5 shadow-xl border border-surface-container flex flex-col gap-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{transaction.categoryEmoji}</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {transaction.categoryName}
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {formatDateLabel(transaction.date)} · {formatTime(transaction.date)}
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

        <div className="flex flex-col items-center py-3 bg-surface-container-low rounded-xl">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Amount
          </span>
          <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold tabular-nums">
            -{formatWon(transaction.amount)}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1 border-b border-surface-container-low">
            <span className="text-on-surface-variant">메모</span>
            <span className="font-medium text-on-surface text-right">{transaction.memo}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-surface-container-low">
            <span className="text-on-surface-variant">결제 수단</span>
            <span className="font-medium text-on-surface">{transaction.paymentMethod}</span>
          </div>
          {transaction.tag && (
            <div className="flex justify-between py-1 border-b border-surface-container-low">
              <span className="text-on-surface-variant">태그</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                {transaction.tag}
              </span>
            </div>
          )}
          <div className="flex justify-between py-1">
            <span className="text-on-surface-variant">1인가구 필수 지출</span>
            <span className={`font-label-sm font-semibold ${transaction.isSoloEssential ? 'text-primary' : 'text-outline'}`}>
              {transaction.isSoloEssential ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg font-medium transition-colors"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('이 내역을 삭제하시겠습니까?')) {
                onDelete(transaction.id);
                onClose();
              }
            }}
            className="flex-1 py-3 rounded-full bg-error text-on-error font-label-lg font-semibold hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            <span>삭제하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

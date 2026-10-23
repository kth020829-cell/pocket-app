export type TransactionType = 'expense' | 'income' | 'transfer';

export type ExpenseCategory = 
  | 'food' 
  | 'cafe' 
  | 'transport' 
  | 'shopping' 
  | 'bills' 
  | 'etc';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: ExpenseCategory;
  categoryName: string;
  categoryEmoji: string;
  memo: string;
  tag?: string;
  paymentMethod: string;
  date: string; // ISO 8601 string: YYYY-MM-DDTHH:mm:ss
  isSoloEssential: boolean;
}

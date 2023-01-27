export const DEBIT_ACCOUNTS = ['assets', 'liabilities', 'capital', 'expenses'];
export const CREDIT_ACCOUNTS = ['assets', 'liabilities', 'capital', 'income'];

export const DEFAULT_TRANSACTION = {
  date: null,
  transactionHash: '',
  item: '',
  memo: null,
  price: 0,
  debitAccount: 'assets',
  debitAccountValue: 'cash',
  creditAccount: 'assets',
  creditAccountValue: 'cash',
};

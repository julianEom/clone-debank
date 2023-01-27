export type Transaction = {
  _id?: string;
  date: Date | null;
  transactionHash: string;
  item: string;
  memo: string | null;
  price: number;
  debitAccount: string;
  debitAccountValue: string;
  creditAccount: string;
  creditAccountValue: string;
};

export type Records = {
  createdTime: string;
  id: string;
  fields: Transaction;
};

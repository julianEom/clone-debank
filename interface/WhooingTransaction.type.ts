export type Transaction = {
  _id?: string;
  date: Date;
  transactionHash: string;
  item: string;
  memo: string | null;
  price: number;
  debtorType: string;
  debtorCategory: string;
  creditorType: string;
  creditorCategory: string;
};

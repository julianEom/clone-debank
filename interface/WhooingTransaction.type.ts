export type Transaction = {
  date: Date;
  item: string;
  memo?: string | null;
  price: number;
  debtorItem: string;
  debtorCategory: string;
  creditorItem: string;
  creditorCategory: string;
};

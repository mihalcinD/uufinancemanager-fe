type TransactionsResponse = TransactionResponse[];

type TransactionResponse = {
  _id: string;
  value: number;
  description: string;
  parentId: string;
  creatorId: string;
};

export type { TransactionsResponse, TransactionResponse };

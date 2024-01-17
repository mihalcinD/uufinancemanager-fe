type TransactionsResponse = TransactionResponse[];

type TransactionResponse = {
  _id: string;
  value: number;
  description: string;
  tags: string[];
  parentId: string;
  creatorId: string;
  createdAt: number;
  updatedAt: number;
};

export type { TransactionsResponse, TransactionResponse };

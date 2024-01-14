type CreateTransactionPayload = {
  parentId: string;
  value: number;
  description?: string;
  tags?: string[];
  counterpartId?: string;
};

export type { CreateTransactionPayload };

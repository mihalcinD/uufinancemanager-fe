import React, { createContext, useContext, useEffect, useState } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { TransactionResponse, TransactionsResponse } from '../types/api/response/transactions.ts';
import usePost from '../hooks/api/crud/usePost.ts';
import { useHouseholdsContext } from './HouseholdsContext.tsx';
import { CreateTransactionPayload } from '../types/api/payload/transation.ts';

type Props = {
  children: React.ReactNode;
};

type TransactionsContextType = {
  transactions: TransactionsResponse | undefined;
  isLoading: boolean;
  createTransaction: (data: Omit<CreateTransactionPayload, 'parentId'>) => Promise<TransactionResponse>;
  isCreating: boolean;
};

export const useTransactionsContext = () => {
  return useContext(TransactionsContext);
};

export const TransactionsContext = createContext<TransactionsContextType>(undefined!);

export const TransactionsProvider = ({ children }: Props) => {
  const { active } = useHouseholdsContext();
  const { get, isLoading } = useGet<TransactionsResponse>({
    url: '/transaction/list',
    params: { parentId: active },
  });
  const { post, isLoading: isCreating } = usePost<CreateTransactionPayload, TransactionResponse>({
    url: '/transaction/create',
  });
  const [transactions, setTransactions] = useState<TransactionsResponse>();

  const refresh = async () => {
    const _transactions = await get();
    if (_transactions) {
      setTransactions(_transactions.sort((a, b) => b.createdAt - a.createdAt));
    }
  };

  const createTransaction = (data: Omit<CreateTransactionPayload, 'parentId'>) => {
    return new Promise<TransactionResponse>((resolve, reject) => {
      post({ ...data, parentId: active as string })
        .then(res => {
          setTransactions(prevState => [res, ...(prevState ?? [])]);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  useEffect(() => {
    if (active) {
      refresh();
    }
  }, [active]);

  return (
    <TransactionsContext.Provider value={{ transactions, isLoading, createTransaction, isCreating }}>
      {children}
    </TransactionsContext.Provider>
  );
};

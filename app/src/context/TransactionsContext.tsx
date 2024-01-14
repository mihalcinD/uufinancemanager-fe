import React, { createContext, useContext, useEffect, useState } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { useParams } from 'react-router-dom';
import { TransactionsResponse } from '../types/api/response/transactions.ts';

type Props = {
  children: React.ReactNode;
};

type TransactionsContextType = {
  transactions: TransactionsResponse | undefined;
  isLoading: boolean;
};

export const useTransactionsContext = () => {
  return useContext(TransactionsContext);
};

export const TransactionsContext = createContext<TransactionsContextType>(undefined!);

export const TransactionsProvider = ({ children }: Props) => {
  const { id } = useParams<{ id: string | undefined }>();
  const { get, isLoading } = useGet<TransactionsResponse>({
    url: '/transaction/list',
    params: { parentId: id },
  });
  const [transactions, setTransactions] = useState<TransactionsResponse>();

  const refresh = async () => {
    const _transactions = await get();
    if (_transactions) {
      setTransactions(_transactions);
    }
  };

  useEffect(() => {
    if (id?.length === 24) {
      refresh();
    }
  }, [id]);

  return <TransactionsContext.Provider value={{ transactions, isLoading }}>{children}</TransactionsContext.Provider>;
};

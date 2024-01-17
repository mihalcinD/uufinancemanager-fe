import React, { createContext, useContext } from 'react';
import { TransactionsResponse } from '../types/api/response/transactions.ts';
import { useHouseholdsContext } from './HouseholdsContext.tsx';
import { CreateTransactionPayload } from '../types/api/payload/transation.ts';
import { useHouseholdContext } from './HouseholdContext.tsx';
import useTransactions from '../hooks/useTransactions.ts';

type Props = {
  children: React.ReactNode;
};

type TransactionsContextType = {
  transactions: TransactionsResponse | undefined;
  isLoading: boolean;
  createTransaction: (data: Omit<CreateTransactionPayload, 'parentId'>) => Promise<void>;
  isCreating: boolean;
};

export const useTransactionsContext = () => {
  return useContext(TransactionsContext);
};

export const TransactionsContext = createContext<TransactionsContextType>(undefined!);

export const TransactionsProvider = ({ children }: Props) => {
  const { active } = useHouseholdsContext();
  const { updateBalance } = useHouseholdContext();
  const { transactions, createTransaction, isCreating, isLoading } = useTransactions({ parentID: active });

  const _createTransaction = async (data: Omit<CreateTransactionPayload, 'parentId'>) => {
    const res = await createTransaction(data);
    if (res) {
      await updateBalance(res.value);
    }
  };
  return (
    <TransactionsContext.Provider
      value={{ transactions, isLoading, createTransaction: _createTransaction, isCreating }}>
      {children}
    </TransactionsContext.Provider>
  );
};

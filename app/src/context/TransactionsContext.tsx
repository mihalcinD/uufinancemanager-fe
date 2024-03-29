import React, { createContext, useContext } from 'react';
import { TransactionResponse, TransactionsResponse } from '../types/api/response/transactions.ts';
import { useHouseholdsContext } from './HouseholdsContext.tsx';
import { CreateTransactionPayload } from '../types/api/payload/transation.ts';
import { useHouseholdContext } from './HouseholdContext.tsx';
import useTransactions from '../hooks/api/useTransactions.ts';

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
  const { updateBalance } = useHouseholdContext();
  const { transactions, createTransaction, isCreating, isLoading } = useTransactions({ parentID: active });

  const _createTransaction = async (data: Omit<CreateTransactionPayload, 'parentId'>) => {
    return new Promise<TransactionResponse>((resolve, reject) => {
      createTransaction(data)
        .then(res => {
          updateBalance(res.value);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  return (
    <TransactionsContext.Provider
      value={{ transactions, isLoading, createTransaction: _createTransaction, isCreating }}>
      {children}
    </TransactionsContext.Provider>
  );
};

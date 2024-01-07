import React, { createContext, useContext } from 'react';

type Props = {
  children: React.ReactNode;
};

type TransactionsContextType = {};

export const useTransactionsContext = () => {
  return useContext(TransactionsContext);
};

export const TransactionsContext = createContext<TransactionsContextType>(undefined!);

export const TransactionsProvider = ({ children }: Props) => {
  return <TransactionsContext.Provider value={{}}>{children}</TransactionsContext.Provider>;
};

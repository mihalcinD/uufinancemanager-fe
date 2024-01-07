import React, { createContext, useContext } from 'react';

type Props = {
  children: React.ReactNode;
};

type SavingGoalsContextType = {};

export const useSavingGoalsContext = () => {
  return useContext(SavingGoalsContext);
};

export const SavingGoalsContext = createContext<SavingGoalsContextType>(undefined!);

export const SavingGoalsProvider = ({ children }: Props) => {
  return <SavingGoalsContext.Provider value={{}}>{children}</SavingGoalsContext.Provider>;
};

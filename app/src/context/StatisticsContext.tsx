import React, { createContext, useContext } from 'react';

type Props = {
  children: React.ReactNode;
};

type StatisticsContextType = {};

export const useStatisticsContext = () => {
  return useContext(StatisticsContext);
};

export const StatisticsContext = createContext<StatisticsContextType>(undefined!);

export const StatisticsProvider = ({ children }: Props) => {
  return <StatisticsContext.Provider value={{}}>{children}</StatisticsContext.Provider>;
};

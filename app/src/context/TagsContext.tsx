import React, { createContext, useContext } from 'react';
import { useHouseholdsContext } from './HouseholdsContext.tsx';
import useGet from '../hooks/api/crud/useGet.ts';
import { TransactionsResponse } from '../types/api/response/transactions.ts';

type Props = {
  children: React.ReactNode;
};

type TagsContextType = {};

export const useTagsContext = () => {
  return useContext(TagsContext);
};

export const TagsContext = createContext<TagsContextType>(undefined!);

export const TagsProvider = ({ children }: Props) => {
  const { active } = useHouseholdsContext();
  const { get, isLoading } = useGet<TransactionsResponse>({
    url: '/tag/list',
    params: {},
  });
  return <TagsContext.Provider value={{}}>{children}</TagsContext.Provider>;
};

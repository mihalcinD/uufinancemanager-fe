import { createContext, useContext, useEffect, JSX } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { HouseholdResponse } from '../types/api/response/household.ts';
import { useParams } from 'react-router-dom';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type HouseholdContextType = {
  household: HouseholdResponse | undefined;
  isLoading: boolean;
};

export const useHouseholdContext = () => {
  return useContext(HouseholdContext);
};

export const HouseholdContext = createContext<HouseholdContextType>(undefined!);

export const HouseholdProvider = ({ children }: Props) => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data, refresh, isLoading } = useGet<HouseholdResponse>({ url: '/household/' + id });

  useEffect(() => {
    if (id?.length === 24) {
      refresh();
    }
  }, [id]);

  return <HouseholdContext.Provider value={{ household: data, isLoading }}>{children}</HouseholdContext.Provider>;
};

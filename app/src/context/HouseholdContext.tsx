import { createContext, useContext, useEffect, JSX } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { HouseholdResponse } from '../types/api/response/household.ts';
import { useHouseholdsContext } from './HouseholdsContext.tsx';

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
  const { active } = useHouseholdsContext();
  const { data, refresh, isLoading } = useGet<HouseholdResponse>({ url: '/household/' + active });

  useEffect(() => {
    if (active) {
      refresh();
    }
  }, [active]);

  return <HouseholdContext.Provider value={{ household: data, isLoading }}>{children}</HouseholdContext.Provider>;
};

import { createContext, useContext, useEffect, JSX, useState } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { HouseholdResponse } from '../types/api/response/household.ts';
import { useHouseholdsContext } from './HouseholdsContext.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type HouseholdContextType = {
  household: HouseholdResponse | undefined;
  isLoading: boolean;
  updateBalance: (amount: number) => void;
};

export const useHouseholdContext = () => {
  return useContext(HouseholdContext);
};

export const HouseholdContext = createContext<HouseholdContextType>(undefined!);

export const HouseholdProvider = ({ children }: Props) => {
  const { active } = useHouseholdsContext();
  const { get, isLoading } = useGet<HouseholdResponse>({ url: '/household/' + active });
  const [household, setHousehold] = useState<HouseholdResponse>();

  const refresh = async () => {
    const _household = await get();
    if (_household) {
      setHousehold(_household);
    }
  };

  const updateBalance = (amount: number) => {
    setHousehold(prevState => {
      if (prevState) {
        return {
          ...prevState,
          balance: prevState.balance + amount,
          ...(amount < 0 ? { expenses: prevState.expenses - amount } : { incomes: prevState.incomes + amount }),
        };
      }
      return prevState;
    });
  };

  useEffect(() => {
    if (active) {
      refresh();
    }
  }, [active]);

  return (
    <HouseholdContext.Provider value={{ household, isLoading, updateBalance }}>{children}</HouseholdContext.Provider>
  );
};

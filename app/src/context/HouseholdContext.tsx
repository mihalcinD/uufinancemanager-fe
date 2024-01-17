import { createContext, useContext, useEffect, JSX, useState } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { HouseholdResponse } from '../types/api/response/household.ts';
import { useHouseholdsContext } from './HouseholdsContext.tsx';
import { UpdateHouseholdPayload } from '../types/api/payload/household.ts';
import usePatch from '../hooks/api/crud/usePatch.ts';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type HouseholdContextType = {
  household: HouseholdResponse | undefined;
  isLoading: boolean;
  isPatching: boolean;
  updateBalance: (amount: number) => void;
  updateHousehold: (payload: UpdateHouseholdPayload) => Promise<HouseholdResponse>;
};

export const useHouseholdContext = () => {
  return useContext(HouseholdContext);
};

export const HouseholdContext = createContext<HouseholdContextType>(undefined!);

export const HouseholdProvider = ({ children }: Props) => {
  const { active } = useHouseholdsContext();
  const { get, isLoading } = useGet<HouseholdResponse>({ url: '/household/' + active });
  const [household, setHousehold] = useState<HouseholdResponse>();

  const { patch, isLoading: isPatching } = usePatch<UpdateHouseholdPayload, HouseholdResponse>({
    url: '/household/patch',
  });

  const refresh = async () => {
    const _household = await get();
    if (_household) {
      setHousehold(_household);
    }
  };

  const updateHousehold = (data: UpdateHouseholdPayload) => {
    return new Promise<HouseholdResponse>((resolve, reject) => {
      patch(data)
        .then(res => {
          setHousehold(prevState => res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
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
    <HouseholdContext.Provider value={{ household, isLoading, updateBalance, updateHousehold, isPatching }}>{children}</HouseholdContext.Provider>
  );
};

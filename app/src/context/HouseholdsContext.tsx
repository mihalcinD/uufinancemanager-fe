import { createContext, useContext, useEffect, JSX, useState } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { HouseholdsResponse } from '../types/api/response/household.ts';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type HouseholdsContextType = {
  households: HouseholdsResponse | undefined;
  active: string | undefined;
  setActive: (id: string) => void;
  isLoading: boolean;
  refresh: () => Promise<void>;
};

export const useHouseholdsContext = () => {
  return useContext(HouseholdsContext);
};

export const HouseholdsContext = createContext<HouseholdsContextType>(undefined!);

export const HouseholdsProvider = ({ children }: Props) => {
  const [active, _setActive] = useState<string>();
  const { isLoading, get } = useGet<HouseholdsResponse>({ url: '/household/list' });
  const [households, setHouseholds] = useState<HouseholdsResponse>();
  const navigate = useNavigate();

  const refresh = async () => {
    const _households = await get();
    if (_households) {
      setHouseholds(_households);
    }
  };
  const setActive = (id: string) => {
    _setActive(id);
    navigate(`${id}/dashboard`);
  };

  useEffect(() => {
    if (households && households.length > 0 && !active) {
      setActive(households[0]._id);
    }
  }, [households]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <HouseholdsContext.Provider value={{ households, active, setActive, isLoading, refresh }}>
      {children}
    </HouseholdsContext.Provider>
  );
};

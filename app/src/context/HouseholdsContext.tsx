import { createContext, useContext, useEffect, JSX, useState } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { HouseholdsResponse } from '../types/api/response/household.ts';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type HouseholdsContextType = {
  households: HouseholdsResponse | undefined;
  active: number;
  setActive: (index: number) => void;
  isLoading: boolean;
};

export const useHouseholdsContext = () => {
  return useContext(HouseholdsContext);
};

export const HouseholdsContext = createContext<HouseholdsContextType>(undefined!);

export const HouseholdsProvider = ({ children }: Props) => {
  const [active, setActive] = useState<number>(0);
  const { data, isLoading, refresh } = useGet<HouseholdsResponse>({ url: '/household/list' });
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.length > 0) {
      setActive(0);
      navigate(`${data[0]._id}/dashboard/`);
    }
  }, [data]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <HouseholdsContext.Provider value={{ households: data, active, setActive, isLoading }}>
      {children}
    </HouseholdsContext.Provider>
  );
};

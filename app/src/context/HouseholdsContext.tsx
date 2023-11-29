import { createContext, useContext, useEffect, useMemo, JSX, useState } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type HouseholdsContextType = {
  households: string[];
  active: number;
  setActive: (index: number) => void;
};

export const useHouseholdsContext = () => {
  return useContext(HouseholdsContext);
};

export const HouseholdsContext = createContext<HouseholdsContextType>(undefined!);

export const HouseholdsProvider = ({ children }: Props) => {
  const [households, setHouseholds] = useState(["David's Family", "Jarda's Family", "Jacob's Family"]);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {}, []);

  return <HouseholdsContext.Provider value={{ households, active, setActive }}>{children}</HouseholdsContext.Provider>;
};

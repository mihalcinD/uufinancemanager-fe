import { createContext, useContext, useEffect, useMemo, JSX, useState } from 'react';

const mockHouseholds = [
  {
    id: 1,
    name: "David's Family",
    balance: 35698.95,
    incomes: 55608.56,
    expenses: 19909.61,
    last_transactions: [
      { name: 'Transaction 1', value: -12333.89 },
      { name: 'Transaction 2', value: 333.3 },
      { name: 'Transaction 3', value: -1945.87 },
    ],
    members: [
      { id: 22, name: 'David' },
      { id: 23, name: 'Jana' },
      { id: 24, name: 'Jarda' },
    ],
    statistics: {
      week: {
        overall_balance: 7434.59,
        values: [
          { date: '2023-12-10', balance: 110100 },
          { date: '2023-12-11', balance: 102300 },
          { date: '2023-12-12', balance: 102345 },
          { date: '2023-12-13', balance: 102999 },
          { date: '2023-12-14', balance: 103121 },
          { date: '2023-12-15', balance: 101201 },
          { date: '2023-12-16', balance: 111534.65 },
        ],
      },
      moth: {
        overall_balance: 144.65,
        values: [
          { date: '2023-12-10', balance: 110100 },
          { date: '2023-12-11', balance: 102300 },
          { date: '2023-12-12', balance: 102345 },
          { date: '2023-12-13', balance: 102999 },
          { date: '2023-12-14', balance: 103121 },
          { date: '2023-12-15', balance: 101201 },
          { date: '2023-12-16', balance: 111534.65 },
        ],
      },
    },
    saving_goals: [
      { name: 'New Car', goal: 100000, balance: 50000 },
      { name: 'New House', goal: 1000000, balance: 700000 },
    ],
  },
  {
    id: 2,
    name: "Jarda's Family",
    balance: 12333.55,
    incomes: 29698.55,
    expenses: 17365,
    last_transactions: [
      { name: 'Transaction 1', value: -12333.89 },
      { name: 'Transaction 2', value: 333.3 },
      { name: 'Transaction 3', value: -1945.87 },
    ],
    members: [
      { id: 22, name: 'David' },
      { id: 23, name: 'Jana' },
      { id: 24, name: 'Jarda' },
    ],
    statistics: {
      week: {
        overall_balance: 1134.65,
        values: [
          { date: '2023-12-10', balance: 110100 },
          { date: '2023-12-11', balance: 102300 },
          { date: '2023-12-12', balance: 102345 },
          { date: '2023-12-13', balance: 102999 },
          { date: '2023-12-14', balance: 103121 },
          { date: '2023-12-15', balance: 101201 },
          { date: '2023-12-16', balance: 111534.65 },
        ],
      },
      moth: {
        overall_balance: 934.65,
        values: [
          { date: '2023-12-10', balance: 110100 },
          { date: '2023-12-11', balance: 102300 },
          { date: '2023-12-12', balance: 102345 },
          { date: '2023-12-13', balance: 102999 },
          { date: '2023-12-14', balance: 103121 },
          { date: '2023-12-15', balance: 101201 },
          { date: '2023-12-16', balance: 111534.65 },
        ],
      },
    },
    saving_goals: [
      { name: 'New Car', goal: 100000, balance: 50000 },
      { name: 'New House', goal: 1000000, balance: 700000 },
    ],
  },
  {
    id: 3,
    name: "Jacob's Family",
    balance: 10505.98,
    incomes: 943222.6,
    expenses: 932716.62,
    last_transactions: [
      { name: 'Transaction 1', value: -12333.89 },
      { name: 'Transaction 2', value: 333.3 },
      { name: 'Transaction 3', value: -1945.87 },
    ],
    members: [
      { id: 22, name: 'David' },
      { id: 23, name: 'Jana' },
      { id: 24, name: 'Jarda' },
    ],
    statistics: {
      week: {
        overall_balance: 1434.65,
        values: [
          { date: '2023-12-10', balance: 110100 },
          { date: '2023-12-11', balance: 102300 },
          { date: '2023-12-12', balance: 102345 },
          { date: '2023-12-13', balance: 102999 },
          { date: '2023-12-14', balance: 103121 },
          { date: '2023-12-15', balance: 101201 },
          { date: '2023-12-16', balance: 111534.65 },
        ],
      },
      moth: {
        overall_balance: 1334.65,
        values: [
          { date: '2023-12-10', balance: 110100 },
          { date: '2023-12-11', balance: 102300 },
          { date: '2023-12-12', balance: 102345 },
          { date: '2023-12-13', balance: 102999 },
          { date: '2023-12-14', balance: 103121 },
          { date: '2023-12-15', balance: 101201 },
          { date: '2023-12-16', balance: 111534.65 },
        ],
      },
    },
    saving_goals: [
      { name: 'New Car', goal: 100000, balance: 50000 },
      { name: 'New House', goal: 1000000, balance: 700000 },
    ],
  },
];
type Props = {
  children: JSX.Element | JSX.Element[];
};

type HouseholdsContextType = {
  households: typeof mockHouseholds | undefined;
  active: number;
  setActive: (index: number) => void;
  isLoading: boolean;
};

export const useHouseholdsContext = () => {
  return useContext(HouseholdsContext);
};

export const HouseholdsContext = createContext<HouseholdsContextType>(undefined!);

export const HouseholdsProvider = ({ children }: Props) => {
  const [households, setHouseholds] = useState(mockHouseholds);
  const [active, setActive] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 4000);
  }, []);

  return (
    <HouseholdsContext.Provider value={{ households, active, setActive, isLoading }}>
      {children}
    </HouseholdsContext.Provider>
  );
};

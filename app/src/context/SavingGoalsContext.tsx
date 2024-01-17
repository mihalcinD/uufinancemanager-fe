import React, { createContext, useContext, useEffect, useState } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import usePost from '../hooks/api/crud/usePost.ts';
import { useHouseholdsContext } from './HouseholdsContext.tsx';
import { CreateSavingGoalPayload } from '../types/api/payload/savingGoal.ts';
import { SavingGoalResponse, SavingGoalsResponse } from '../types/api/response/savingGoals.ts';

type Props = {
  children: React.ReactNode;
};

type SavingGoalsContextType = {
  savingGoals: SavingGoalsResponse | undefined;
  isLoading: boolean;
  createSavingGoal: (data: Omit<CreateSavingGoalPayload, 'householdId'>) => Promise<SavingGoalResponse>;
  isCreating: boolean;
};

export const useSavingGoalsContext = () => {
  return useContext(SavingGoalsContext);
};

export const SavingGoalsContext = createContext<SavingGoalsContextType>(undefined!);

export const SavingGoalsProvider = ({ children }: Props) => {
  const { active } = useHouseholdsContext();
  const { get, isLoading } = useGet<SavingGoalsResponse>({
    url: '/saving/list',
    params: {
      householdId: active,
    },
  });
  const { post, isLoading: isCreating } = usePost<CreateSavingGoalPayload, SavingGoalResponse>({
    url: '/saving/create',
  });
  const [savingGoals, setSavingGoals] = useState<SavingGoalsResponse>();

  const refresh = async () => {
    const _savingGoals = await get();
    if (_savingGoals) {
      setSavingGoals(_savingGoals);
    }
  };

  const createSavingGoal = (data: Omit<CreateSavingGoalPayload, 'householdId'>) => {
    return new Promise<SavingGoalResponse>((resolve, reject) => {
      post({ ...data, householdId: active as string })
        .then(res => {
          setSavingGoals(prevState => [res, ...(prevState ?? [])]);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  useEffect(() => {
    if (active) refresh();
  }, [active]);

  return (
    <SavingGoalsContext.Provider value={{ savingGoals, isLoading, isCreating, createSavingGoal }}>
      {children}
    </SavingGoalsContext.Provider>
  );
};

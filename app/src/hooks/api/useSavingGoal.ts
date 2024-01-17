import { useEffect, useState } from 'react';
import { SavingGoalResponse } from '../../types/api/response/savingGoals.ts';
import useGet from './crud/useGet.ts';
import { ApiUrl } from './api.const.ts';
import useTransactions from './useTransactions.ts';
import { useTransactionsContext } from '../../context/TransactionsContext.tsx';
import { useHouseholdContext } from '../../context/HouseholdContext.tsx';

type Props = { savingGoalID: string | undefined };
const useSavingGoal = ({ savingGoalID }: Props) => {
  const { get, isLoading } = useGet<SavingGoalResponse>({ url: ApiUrl([savingGoalID]).savingGoal });
  const [savingGoal, setSavingGoal] = useState<SavingGoalResponse>();
  const {
    transactions,
    isLoading: isLoadingTransactions,
    createTransaction: createSavingGoalTransaction,
  } = useTransactions({ parentID: savingGoalID });
  const { createTransaction: createHouseholdTransaction } = useTransactionsContext();
  const { household } = useHouseholdContext();

  const createTransaction = (data: { value: number; description: string }) => {
    return new Promise<void>((resolve, reject) => {
      if (household && data.value > household.balance) {
        reject();
        return;
      }
      createHouseholdTransaction({ ...data, value: -data.value }).then(householdTransaction => {
        createSavingGoalTransaction({ ...data, value: data.value, counterpartId: householdTransaction._id }).then(
          transaction => {
            setSavingGoal(prev => {
              if (prev) {
                return {
                  ...prev,
                  currentBalance: prev.currentBalance + transaction.value,
                };
              }
              return prev;
            });
            resolve();
          },
        );
      });
    });
  };
  const refresh = async () => {
    const _savingGoal = await get();
    if (_savingGoal) {
      setSavingGoal(_savingGoal);
    }
  };
  useEffect(() => {
    if (savingGoalID?.length === 24) refresh();
  }, [savingGoalID]);
  return { refresh, isLoading, savingGoal, transactions, isLoadingTransactions, createTransaction };
};
export default useSavingGoal;

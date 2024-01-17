export const ApiUrl = <T = never>([...params]: T[] = []) => ({
  transaction: `transaction/${params[0]}`,
  savingGoal: `/saving/${params[0]}`,
});

export const ApiUrl = <T = never>([...params]: T[] = []) => ({
  transaction: `transaction/${params[0]}`,
});

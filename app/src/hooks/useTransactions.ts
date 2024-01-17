import { useEffect, useState } from 'react';
import { TransactionResponse, TransactionsResponse } from '../types/api/response/transactions.ts';
import usePost from './api/crud/usePost.ts';
import { CreateTransactionPayload } from '../types/api/payload/transation.ts';
import useGet from './api/crud/useGet.ts';

type Props = { parentID: string | undefined };
const useTransactions = ({ parentID }: Props) => {
  const { get, isLoading } = useGet<TransactionsResponse>({
    url: '/transaction/list',
    params: { parentId: parentID },
  });
  const { post, isLoading: isCreating } = usePost<CreateTransactionPayload, TransactionResponse>({
    url: '/transaction/create',
  });
  const [transactions, setTransactions] = useState<TransactionsResponse>();

  const refresh = async () => {
    const _transactions = await get();
    if (_transactions) {
      setTransactions(_transactions.sort((a, b) => b.createdAt - a.createdAt));
    }
  };

  const createTransaction = (data: Omit<CreateTransactionPayload, 'parentId'>) => {
    return new Promise<TransactionResponse | undefined>((resolve, reject) => {
      post({ ...data, parentId: parentID as string })
        .then(res => {
          setTransactions(prevState => [res, ...(prevState ?? [])]);
          resolve(res);
        })
        .catch(err => {
          resolve(undefined);
        });
    });
  };

  useEffect(() => {
    if (parentID?.length === 24) refresh();
  }, [parentID]);
  return { refresh, isLoading, transactions, createTransaction, isCreating };
};
export default useTransactions;

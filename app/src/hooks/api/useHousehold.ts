import useGet from './crud/useGet.ts';
import { useEffect } from 'react';
import { HouseholdResponse } from '../../types/api/response/household.ts';

type Props = { id: string | undefined };
const useHousehold = ({ id }: Props) => {
  const { data: household, refresh, isLoading } = useGet<HouseholdResponse>({ url: '/household/' + id });

  useEffect(() => {
    console.log('household: ', household);
  }, [household]);

  useEffect(() => {
    if (id?.length === 24) refresh();
  }, [id]);
  return { household, refresh, isLoading };
};
export default useHousehold;

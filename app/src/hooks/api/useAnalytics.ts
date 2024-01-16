import { useEffect } from 'react';
import useGet from './crud/useGet';

const periodTable = {
  '-1': 'unlimited',
  '7': 'week',
  '30': 'month',
  '90': 'qartal',
};
export interface UseAnalyticsProps {
  parentId?: string;
  period: -1 | 7 | 30 | 90;
}
const useAnalytics = ({ parentId, period }: UseAnalyticsProps) => {
  const { data, refresh } = useGet<TransactionsAnalyzeResponse>({ url: '/transaction/analyze', params: { parentId: parentId || '', period: periodTable[`${period}`] } });
  useEffect(() => {
    if (parentId?.length === 24 && period) {
      refresh();
    }
  }, [parentId, period]);
  return { data };
};

export default useAnalytics;

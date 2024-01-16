import { useEffect } from 'react';
import useGet from './crud/useGet';
import { HouseholdStatisticsResponse } from '../../types/api/response/household';

export interface UseStatisticsProps {
  parentId?: string;
  userId?: string;
  tagId?: string;
  period?: number;
  positive?: boolean;
}

const useStatistics = ({ parentId, period, positive, tagId, userId }: UseStatisticsProps) => {
  const { data, refresh } = useGet<HouseholdStatisticsResponse>({
    url: '/household/statistics',
    params: {
      parentId: parentId || '',
      ...(period !== -1 ? { period: String(period) } : {}),
      ...(positive !== undefined ? { positive: String(positive) } : {}),
      ...(tagId ? { tagId } : {}),
      ...(userId ? { userId } : {}),
    },
  });
  useEffect(() => {
    if (parentId?.length === 24) {
      refresh();
    }
  }, [parentId, period, positive, tagId, userId]);
  return { data };
};

export default useStatistics;

import {useSuspenseQuery} from '@tanstack/react-query';
import {getWeightRecords} from '../api/api';

export const QUERY_KEY = 'weights';

const useWeightRecords = (individualId: string) => {
  const fetcher = () => getWeightRecords(individualId);

  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useWeightRecords;

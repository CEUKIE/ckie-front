import {useSuspenseQuery} from '@tanstack/react-query';
import {getWeightRecords} from '../api/api';

const QUERY_KEK = 'weights';

const useWeightRecords = (individualId: string) => {
  const fetcher = () => getWeightRecords(individualId);

  return useSuspenseQuery({
    queryKey: [QUERY_KEK],
    queryFn: fetcher,
  });
};

export default useWeightRecords;

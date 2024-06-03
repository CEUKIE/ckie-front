import {useSuspenseQuery} from '@tanstack/react-query';
import {getRecords} from '../api/api';

const QUERY_KEY = 'records';

const useRecords = (individualId: string) => {
  const fetcher = () => getRecords(individualId);

  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useRecords;

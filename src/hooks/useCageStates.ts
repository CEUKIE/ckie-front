import {useSuspenseQuery} from '@tanstack/react-query';
import {getCageState} from '../api/api';

const QUERY_KEY = 'states';

const useCageStates = (cageId: string) => {
  const fetcher = () => getCageState(cageId);

  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useCageStates;

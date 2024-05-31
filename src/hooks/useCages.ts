import {useSuspenseQuery} from '@tanstack/react-query';
import {getCages} from '../api/api';

const QUERY_KEY = 'cages';
const fetcher = () => getCages();

const useCages = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useCages;

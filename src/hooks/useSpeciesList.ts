import {useSuspenseQuery} from '@tanstack/react-query';
import {getSpeciesList} from '../api/api';

export const QUERY_KEY = 'species';
const fetcher = () => getSpeciesList();

const useSpeciesList = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useSpeciesList;

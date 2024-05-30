import {useSuspenseQuery} from '@tanstack/react-query';
import {getIndividuals} from '../api/api';

export const QUERY_KEY = 'individuals';

const fetcher = () => getIndividuals();

const useIndividuals = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useIndividuals;

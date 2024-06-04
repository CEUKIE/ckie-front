import {useSuspenseQuery} from '@tanstack/react-query';
import {getIndividualDetail} from '../api/api';

export const QUERY_KEY = 'individual';

const useIndividualDetail = (id: string) => {
  const fetcher = () => getIndividualDetail(id);

  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useIndividualDetail;

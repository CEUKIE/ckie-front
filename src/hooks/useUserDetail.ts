import {useSuspenseQuery} from '@tanstack/react-query';
import {getUserDetail} from '../api/api';

export const QUERY_KEY = 'user';
const fetcher = () => getUserDetail();

const useUserDetail = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useUserDetail;

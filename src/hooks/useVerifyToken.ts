import {useSuspenseQuery} from '@tanstack/react-query';
import {verfiyAccessToken} from '../api/api';

const QUERY_KEY = 'verify';
const fetcher = () => verfiyAccessToken();

const useVerifyToken = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetcher,
  });
};

export default useVerifyToken;

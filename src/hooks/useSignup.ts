import {useMutation} from '@tanstack/react-query';
import {signup} from '../api/api';
import {AuthType} from '../api/types';
import {persist} from '../utils/persistence';
import {useNav} from './useNav';

const fetcher = (data: AuthType.SignupRequest) => signup(data);

const useSignup = () => {
  const navigation = useNav<'UserInfoInputScreen'>();

  return useMutation({
    mutationFn: fetcher,
    onSuccess: async data => {
      const {result} = data;
      await persist('accessToken', result!.accessToken);
      navigation.replace('MainTab');
    },
  });
};

export default useSignup;

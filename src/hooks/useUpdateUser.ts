import {useMutation, useQueryClient} from '@tanstack/react-query';

import {updateUserInfo} from '../api/api';
import {UserType} from '../api/types';
import {useNav} from './useNav';
import {QUERY_KEY} from './useUserDetail';

const fetcher = (data: UserType.UpdateUserRequest) => updateUserInfo(data);

const useUpdateUser = () => {
  const navigation = useNav<'UserInfoEditScreen'>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      navigation.goBack();
    },
  });
};

export default useUpdateUser;

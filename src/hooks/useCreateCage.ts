import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createCage} from '../api/api';
import {CageType} from '../api/types';
import {useNav} from './useNav';
import {QUERY_KEY} from './useCages';
import useCageRegistrationStore from '../stores/useCageRegistrationStore';

const fetcher = (data: CageType.CreateCageRequest) => createCage(data);

const useCreateCage = () => {
  const {clear} = useCageRegistrationStore();
  // const navigation = useNav<'MainTab'>();
  const queryCliet = useQueryClient();

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryCliet.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      // navigation.replace('MainTab');
      clear();
    },
  });
};

export default useCreateCage;

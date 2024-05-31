import {useMutation, useQueryClient} from '@tanstack/react-query';

import {updateIndividual} from '../api/api';
import {IndividualType} from '../api/types';
import {QUERY_KEY} from './useIndividuals';
import {useNav} from './useNav';

const fetcher = (data: IndividualType.UpdateIndividualRequest) =>
  updateIndividual(data);

const useUpdateIndividual = () => {
  const navigation = useNav<'MainTab'>();
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

export default useUpdateIndividual;

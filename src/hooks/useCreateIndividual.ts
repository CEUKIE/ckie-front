import {useMutation, useQueryClient} from '@tanstack/react-query';

import {createIndividual} from '../api/api';
import {IndividualType} from '../api/types';
import {QUERY_KEY} from './useIndividuals';
import {useNav} from './useNav';

const fetcher = (data: IndividualType.CreateIndividualRequest) =>
  createIndividual(data);

const useCreateIndividual = () => {
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

export default useCreateIndividual;

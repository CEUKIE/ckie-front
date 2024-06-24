import {useMutation, useQueryClient} from '@tanstack/react-query';

import {updateIndividual} from '../api/api';
import {IndividualType} from '../api/types';
import {QUERY_KEY as INDIVIDUAL_LIST_KEY} from './useIndividuals';
import {QUERY_KEY as INDIVIDUAL_DETAIL_KEY} from './useIndividualDetail';

const fetcher = (data: IndividualType.UpdateIndividualRequest) =>
  updateIndividual(data);

const useUpdateIndividual = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [INDIVIDUAL_LIST_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [INDIVIDUAL_DETAIL_KEY],
      });
    },
  });
};

export default useUpdateIndividual;

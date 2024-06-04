import {useMutation, useQueryClient} from '@tanstack/react-query';

import {createRecord} from '../api/api';
import {RecordType} from '../api/types';
import {QUERY_KEY as RECORD_QUERY_KEY} from './useRecords';
import {QUERY_KEY as WEIGHT_QUERY_KEY} from './useWeightRecords';

const fetcher = (data: RecordType.CreateRecordsRequest) => createRecord(data);

const useCreateRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RECORD_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [WEIGHT_QUERY_KEY],
      });
    },
  });
};

export default useCreateRecord;

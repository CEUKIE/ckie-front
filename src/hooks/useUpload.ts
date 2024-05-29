import {useMutation} from '@tanstack/react-query';
import {uploadImage} from '../api/api';

const fetcher = (data: FormData) => uploadImage(data);

const useUpload = () => {
  return useMutation({
    mutationFn: fetcher,
  });
};

export default useUpload;

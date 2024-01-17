import { AxiosError } from 'axios';
import { useState } from 'react';
import { CacheAxiosResponse } from 'axios-cache-interceptor';
import { ResponseError } from '../../../types/Api.ts';
import { useApiContext } from '../../../context/ApiContext.tsx';
import { useSnackbar } from 'notistack';

type Props = { url: string; params?: Record<string, string> };
const UsePostMultipart = <T, K>({ url, params }: Props) => {
  const { axios } = useApiContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<K>();
  const [error, setError] = useState<ResponseError>();
  const { enqueueSnackbar } = useSnackbar();

  const post = (data: T, newUrl?: string): Promise<K> => {
    const properURL = newUrl ?? url;
    console.log('[POST] url: ', properURL, ' PARAMS: ', params, ' DATA: ', data);
    setError(undefined);
    setIsLoading(true);
    return new Promise<K>((resolve, reject) =>
      axios
        .post(properURL, data, {
          params: params,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res: CacheAxiosResponse<K, any>) => {
          setResponse(res.data);
          setIsLoading(false);
          resolve(res.data);
        })
        .catch(({ response: res }: AxiosError) => {
          console.error('[POST] url: ', url, res?.data, res?.status);
          setError({ message: res?.data, code: res?.status });
          setIsLoading(false);
          enqueueSnackbar('Ups, něco se nepovedlo :(', { variant: 'error' });
          reject(res?.status);
        }),
    );
  };

  return { isLoading, response, error, post };
};

export default UsePostMultipart;

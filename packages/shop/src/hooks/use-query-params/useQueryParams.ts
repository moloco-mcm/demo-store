import { useRouter } from 'next/router';

export const useQueryParams = <
  T extends { [key: string]: string | undefined }
>() => {
  // not appropriate to use router.query because it is undefined on the first render.
  const { asPath } = useRouter();
  const queryParamsStr = asPath.split('?').slice(1).join('');
  const urlSearchParams = new URLSearchParams(queryParamsStr);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params as T;
};

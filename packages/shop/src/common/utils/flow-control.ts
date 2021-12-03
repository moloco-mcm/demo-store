export type AsyncFunction = (...args: any) => Promise<any>;

export type AsyncFunctionReturnType<T extends AsyncFunction> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export const asyncTryCatch = async <T extends AsyncFunction>(
  asyncFn: T,
  ...args: Parameters<T>
): Promise<[AsyncFunctionReturnType<T>, null] | [null, any]> => {
  try {
    const result = await asyncFn(...args);
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};

export const isAsyncTryCatchError = <T extends AsyncFunction>(
  result: [AsyncFunctionReturnType<T>, null] | [null, any]
): result is [null, any] => {
  if (result[1] !== null) return true;
  return false;
};

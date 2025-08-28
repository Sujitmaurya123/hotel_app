import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import API from './api';



export type AxiosBaseQueryArgs = {
url: string;
method?: AxiosRequestConfig['method'];
data?: AxiosRequestConfig['data'];
 body?: AxiosRequestConfig["data"];
params?: AxiosRequestConfig['params'];
headers?: AxiosRequestConfig['headers'];
};


export const axiosBaseQuery = (): BaseQueryFn<
AxiosBaseQueryArgs,
unknown,
{ status?: number | string; data?: unknown }
> =>
async ({ url, method = 'GET', data,body, params, headers }) => {
try {
const result = await API({ url, method,
     data: data ?? body,
      params, headers });
return { data: result.data };
} catch (e) {
const err = e as AxiosError;
return {
error: {
status: err.response?.status ?? 'FETCH_ERROR',
data: err.response?.data ?? err.message,
},
};
}
};
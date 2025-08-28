import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../services/axiosBaseQuery';



export const apiSlice = createApi({
reducerPath: 'api',
baseQuery: axiosBaseQuery(), // axios under the hood
tagTypes: ['Auth', 'Profile', 'Post'],
endpoints: () => ({}), // endpoints are injected from feature slices
});
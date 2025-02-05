import { SEARCH_URL } from './constrants';
import { apiConfig } from './apiConfig';

export const searchApi = apiConfig.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsersSearch: builder.query({
            query: ({ page, search }: { page: number; search: string }) => ({
                url: `${SEARCH_URL}/users?page=${page}&search=${search}`,
            }),
            transformResponse: (response: any) => response,
            providesTags: ['User'],
        }),
        fetchPostsSearch: builder.query({
            query: ({ page, search }: { page: number; search: string }) => ({
                url: `${SEARCH_URL}?page=${page}&search=${search}`,
            }),
            transformResponse: (response: any) => response,
            providesTags: ['Post'],
        }),
    }),
});

export const { useFetchUsersSearchQuery, useFetchPostsSearchQuery } = searchApi;

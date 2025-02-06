import { USER_URL } from './constrants';
import { apiConfig } from './apiConfig';

export const userApi = apiConfig.injectEndpoints({
    endpoints: (builder) => ({
        fetchUserById: builder.query({
            query: (id: string) => ({
                url: `${USER_URL}/${id}`,
            }),
            transformResponse: (response: any) => response,
            providesTags: ['User'],
        }),
    }),
});

export const { useFetchUserByIdQuery } = userApi;

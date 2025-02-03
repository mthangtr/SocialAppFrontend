import { apiConfig } from '../apiConfig';
import { logout } from '@/libs/states/authSlice';
import { AUTH_URL } from '../constrants';

export const authenApi = apiConfig.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
            onQueryStarted: async (_, { dispatch }) => {
                dispatch(logout());
            },
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authenApi;

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
        updateProfile: builder.mutation({
            query: ({ userId, body }: { userId: string; body: any }) => ({
                url: `${USER_URL}/${userId}/update-profile`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        updateAvatar: builder.mutation({
            query: ({ userId, formData }) => ({
                url: `${USER_URL}/${userId}/avatar`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useFetchUserByIdQuery, useUpdateProfileMutation, useUpdateAvatarMutation } = userApi;

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
        sendFriendRequest: builder.mutation({
            query: ({ senderId, receiverId }: { senderId: string; receiverId: string }) => ({
                url: `${USER_URL}/send-friend-request`,
                method: 'POST',
                body: { senderId, receiverId },
            }),
            invalidatesTags: ['User'],
        }),
        acceptFriendRequest: builder.mutation({
            query: ({ senderId, receiverId }: { senderId: string; receiverId: string }) => ({
                url: `${USER_URL}/accept-friend-request`,
                method: 'POST',
                body: { senderId, receiverId },
            }),
            invalidatesTags: ['User'],
        }),
        rejectFriendRequest: builder.mutation({
            query: ({ senderId, receiverId }: { senderId: string; receiverId: string }) => ({
                url: `${USER_URL}/reject-friend-request`,
                method: 'POST',
                body: { senderId, receiverId },
            }),
            invalidatesTags: ['User'],
        }),
        cancelSendFriendRequest: builder.mutation({
            query: ({ senderId, receiverId }: { senderId: string; receiverId: string }) => ({
                url: `${USER_URL}/cancel-sent-friend-request`,
                method: 'POST',
                body: { senderId, receiverId },
            }),
            invalidatesTags: ['User'],
        }),
        fetchFriendRequests: builder.query({
            query: ({ userId, limit }: { userId: string; limit?: number }) => ({
                url: `${USER_URL}/${userId}/friend-requests?limit=${limit}`,
            }),
            transformResponse: (response: any) => response,
            providesTags: ['User'],
        }),
        fetchFriends: builder.query({
            query: ({ userId, limit }: { userId: string; limit?: number }) => ({
                url: `${USER_URL}/${userId}/friends?limit=${limit}`,
            }),
            transformResponse: (response: any) => response,
            providesTags: ['User'],
        }),
        unFriend: builder.mutation({
            query: ({ userId, friendId }: { userId: string; friendId: string }) => ({
                url: `${USER_URL}/${userId}/unfriend`,
                method: 'POST',
                body: { friendId },
            }),
            invalidatesTags: ['User'],
        }),
        getSuggestedFriends: builder.query({
            query: ({ userId }: { userId: string }) => ({
                url: `${USER_URL}/${userId}/suggest-friends`,
            }),
            transformResponse: (response: any) => response,
            providesTags: ['User'],
        }),
    }),
});

export const {
    useFetchUserByIdQuery,
    useUpdateProfileMutation,
    useUpdateAvatarMutation,
    useSendFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useRejectFriendRequestMutation,
    useCancelSendFriendRequestMutation,
    useFetchFriendRequestsQuery,
    useFetchFriendsQuery,
    useUnFriendMutation,
    useGetSuggestedFriendsQuery,
} = userApi;

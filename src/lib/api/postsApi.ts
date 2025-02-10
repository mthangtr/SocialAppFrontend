import { apiConfig } from './apiConfig';
import { POST_URL } from './constrants';

export const postsApi = apiConfig.injectEndpoints({
    endpoints: (builder) => ({
        fetchPosts: builder.query({
            query: ({ userId, page }: { userId: String; page: number }) => ({
                url: `${POST_URL}/${userId}/?page=${page}`,
            }),
            transformResponse: (response: any) => {
                return response.length ? response : [];
            },
            providesTags: ['Post'],
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `${POST_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Post'],
        }),
        reactToPost: builder.mutation({
            query: ({ userId, postId, reaction }) => ({
                url: `${POST_URL}/${postId}/react`,
                method: 'POST',
                body: { reaction },
            }),
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation({
            query: ({ userId, postId, data }) => ({
                url: `${POST_URL}/${userId}/${postId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Post'],
        }),
        deletePost: builder.mutation({
            query: ({ userId, postId }) => ({
                url: `${POST_URL}/${userId}/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
        setPrivacy: builder.mutation({
            query: ({ userId, postId, privacy }) => ({
                url: `${POST_URL}/${userId}/${postId}/privacy`,
                method: 'PATCH',
                body: { privacy },
            }),
            invalidatesTags: ['Post'],
        }),
        fetchPostByUserId: builder.query({
            query: ({ userId, page, viewerId }: { userId: string; page: number; viewerId: string }) => ({
                url: `${POST_URL}/user/${userId}?page=${page}&viewerId=${viewerId}`,
            }),
            transformResponse: (response: any) => response,
            providesTags: ['Post'],
        }),
    }),
});

export const {
    useFetchPostsQuery,
    useCreatePostMutation,
    useReactToPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useSetPrivacyMutation,
    useFetchPostByUserIdQuery,
} = postsApi;

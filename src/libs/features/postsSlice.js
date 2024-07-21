import { apiSlice } from "./apiSlice";
import { POST_URL } from "./constrants";

export const postsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchPosts: builder.query({
            query: ({ page }) => ({
                url: `${POST_URL}?page=${page}`
            }),
            transformResponse: (response) => {
                return response.length ? response : [];
            },
            providesTags: ["Post"],
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `${POST_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Post"],
        }),
        reactToPost: builder.mutation({
            query: ({ postId, reaction }) => ({
                url: `${POST_URL}/${postId}/react`,
                method: 'POST',
                body: { reaction },
            }),
            invalidatesTags: ["Post"],
        }),
    }),
});

export const {
    useFetchPostsQuery,
    useCreatePostMutation,
    useReactToPostMutation,
} = postsSlice;
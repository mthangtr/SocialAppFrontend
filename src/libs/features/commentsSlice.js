import { apiSlice } from "./apiSlice";
import { COMMENT_URL } from "./constrants";

export const commentsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchComments: builder.query({
            query: ({ postId, page }) => ({
                url: `${COMMENT_URL}/${postId}?page=${page}`,
            }),
            transformResponse: (response) => response,
            providesTags: (result, error, { postId }) => [
                { type: "Comment", id: `POST_${postId}` },
            ],
        }),
        fetchOnly2Comments: builder.query({
            query: ({ postId }) => ({
                url: `${COMMENT_URL}/${postId}/limit2`,
            }),
            transformResponse: (response) => response,
            providesTags: (result, error, { postId }) => [
                { type: "Comment", id: `POST_${postId}_LIMIT2` },
            ],
        }),
        createComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, { postId }) => [
                { type: "Comment", id: `POST_${postId}` },
                { type: "Comment", id: `POST_${postId}_LIMIT2` },
            ],
        }),
        editComment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${COMMENT_URL}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Comment", id },
            ],
        }),
        removeComment: builder.mutation({
            query: (id) => ({
                url: `${COMMENT_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Comment", id },
            ],
        }),
        getTotalCommentsByPostId: builder.query({
            query: (postId) => ({
                url: `${COMMENT_URL}/${postId}/total`,
            }),
        }),
        fetchRepliesForComment: builder.query({
            query: ({ commentId, page }) => ({
                url: `${COMMENT_URL}/${commentId}/replies?page=${page}`,
            }),
            transformResponse: (response) => response,
            providesTags: (result, error, { commentId }) => [
                { type: "Comment", id: `COMMENT_${commentId}_REPLIES` },
            ],
        }),
        reactToComment: builder.mutation({
            query: ({ commentId, reaction }) => ({
                url: `${COMMENT_URL}/${commentId}/react`,
                method: "PATCH",
                body: { reaction },
            }),
            invalidatesTags: (result, error, { commentId }) => [
                { type: "Comment", id: `COMMENT_${commentId}_REPLIES` },
            ],
        }),
    }),
});

export const {
    useFetchCommentsQuery,
    useFetchOnly2CommentsQuery,
    useCreateCommentMutation,
    useEditCommentMutation,
    useRemoveCommentMutation,
    useGetTotalCommentsByPostIdQuery,
    useFetchRepliesForCommentQuery,
    useReactToCommentMutation,
} = commentsSlice;

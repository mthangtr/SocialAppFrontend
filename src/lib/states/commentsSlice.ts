import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentsState {
    [postId: string]: number; // Keyed by postId, value is the comment count
}

const initialState: CommentsState = {};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setCommentCount: (state, action: PayloadAction<{ postId: string; count: number }>) => {
            const { postId, count } = action.payload;
            state[postId] = count;
        },
        incrementCommentCount: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            if (state[postId] !== undefined) {
                state[postId]++;
            } else {
                state[postId] = 1; // If there was no count previously, start from 1
            }
        },
    },
});

export const { setCommentCount, incrementCommentCount } = commentsSlice.actions;

export default commentsSlice.reducer;

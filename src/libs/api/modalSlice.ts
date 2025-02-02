import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
    postId: string | null;
}

const initialState: ModalState = {
    isOpen: false,
    postId: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.isOpen = true;
            state.postId = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.postId = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

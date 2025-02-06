import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authReducer } from './states/authSlice';
import { apiConfig } from './api/apiConfig';
import modalReducer from './states/modalSlice';
import commentsReducer from './states/commentsSlice';

const makeStore = () => {
    const store = configureStore({
        reducer: {
            [apiConfig.reducerPath]: apiConfig.reducer,
            auth: authReducer,
            modal: modalReducer,
            comments: commentsReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiConfig.middleware),
        devTools: true,
    });

    setupListeners(store.dispatch);

    return store;
};

export default makeStore;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

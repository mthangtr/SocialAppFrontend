import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authReducer } from './api/auth/authSlice'; // Ensure correct import
import { apiSliceConfig } from './api/apiSliceConfig';
import modalReducer from './api/modalSlice';

const makeStore = () => {
    const store = configureStore({
        reducer: {
            [apiSliceConfig.reducerPath]: apiSliceConfig.reducer,
            auth: authReducer,
            modal: modalReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSliceConfig.middleware),
        devTools: true,
    });

    setupListeners(store.dispatch);

    return store;
};

export default makeStore;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

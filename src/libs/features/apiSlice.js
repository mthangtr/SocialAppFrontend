import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../features/constrants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('Accept', 'application/json');
        return headers;
    }
});

const baseQueryWithFormData = async (args, api, extraOptions) => {
    const { body, headers } = args;
    if (body instanceof FormData) {
        // Let the browser set the Content-Type including the boundary
        delete headers['Content-Type'];
    }
    return baseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [
        "Post",
        "User",
    ],
    endpoints: () => ({}),
});

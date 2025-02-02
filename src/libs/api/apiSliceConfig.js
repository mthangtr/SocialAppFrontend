import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constrants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('Accept', 'application/json');
        return headers;
    }
});

export const apiSliceConfig = createApi({
    baseQuery,
    tagTypes: [
        "Post",
        "User",
        "Comment",
    ],
    endpoints: () => ({}),
});

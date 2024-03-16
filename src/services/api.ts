import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../utils";

export const BASE_URL = "https://forum-api.dicoding.dev/v1";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "PopulateThreadsAndUsers",
    "Users",
    "Threads",
    "Comments",
    "Votes",
    "Leaderboards",
  ],
  endpoints: () => ({}),
});

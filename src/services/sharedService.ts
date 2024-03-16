import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BASE_URL, api } from "./api";
import { PopulateThreadsAndUsersResponse } from "../interfaces/responses";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPopulateThreadsAndUsers: build.query<
      PopulateThreadsAndUsersResponse,
      void
    >({
      queryFn: async () => {
        const threadsResponse = await fetch(`${BASE_URL}/threads`);
        const {
          data: dataThreads,
          status: statusThreads,
          message: messageThreads,
        } = await threadsResponse.json();
        if (statusThreads === "fail") {
          return { error: messageThreads as FetchBaseQueryError };
        }

        const usersResponse = await fetch(`${BASE_URL}/users`);
        const {
          data: dataUsers,
          status: statusUsers,
          message: statusMessage,
        } = await usersResponse.json();
        if (statusUsers === "fail") {
          return { error: statusMessage as FetchBaseQueryError };
        }

        return {
          data: {
            threads: dataThreads.threads,
            users: dataUsers.users,
          } as unknown as PopulateThreadsAndUsersResponse,
        };
      },
      providesTags: () => [
        { type: "PopulateThreadsAndUsers" },
        { type: "Threads", id: "LIST" },
        { type: "Users", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPopulateThreadsAndUsersQuery } = extendedApi;

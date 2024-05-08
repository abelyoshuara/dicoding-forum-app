import { api } from "./api";
import { DetailThread, Thread } from "../interfaces/attributes";
import {
  CreateThreadResponse,
  ErrorResponse,
  GetThreadResponse,
  GetThreadsResponse,
} from "../interfaces/responses";
import { AddThreadRequest } from "../interfaces/requests";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getThreads: build.query<Thread[], void>({
      query: () => "/threads",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Threads" as const, id })),
              { type: "Threads", id: "LIST" },
            ]
          : [{ type: "Threads", id: "LIST" }],
      transformResponse: (response: GetThreadsResponse) =>
        response.data.threads,
    }),
    getThread: build.query<DetailThread, string>({
      query: (id) => `/threads/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Threads", id }],
      transformResponse: (response: GetThreadResponse) =>
        response.data.detailThread,
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
    addThread: build.mutation<CreateThreadResponse, Partial<AddThreadRequest>>({
      query(body) {
        return {
          url: `/threads`,
          method: "POST",
          body,
        };
      },
      transformErrorResponse: (response: ErrorResponse) => response.data,
      invalidatesTags: [{ type: "Threads", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetThreadsQuery, useGetThreadQuery, useAddThreadMutation } =
  extendedApi;

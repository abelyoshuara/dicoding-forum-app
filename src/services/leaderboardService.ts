import { api } from "./api";
import { Leaderboard } from "../interfaces/attributes";
import { GetLeaderboardsResponse } from "../interfaces/responses";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLeaderboards: build.query<Leaderboard[], void>({
      query: () => "/leaderboards",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ user }) => ({
                type: "Leaderboards" as const,
                id: user.id,
              })),
              { type: "Leaderboards", id: "LIST" },
            ]
          : [{ type: "Leaderboards", id: "LIST" }],
      transformResponse: (response: GetLeaderboardsResponse) =>
        response.data.leaderboards,
    }),
  }),
  overrideExisting: false,
});

export const { useGetLeaderboardsQuery } = extendedApi;

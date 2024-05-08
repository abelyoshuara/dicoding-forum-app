import { BASE_URL, api } from "./api";
import { getAccessToken } from "../utils";
import { setAuthUser } from "../redux/authUser/authUserSlice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GetOwnProfileResponse } from "../interfaces/responses";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    setIsPreload: build.query<GetOwnProfileResponse, void>({
      queryFn: async (_, { dispatch }) => {
        const token = getAccessToken();
        const ownProfileResponse = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const authUser = await ownProfileResponse.json();
        if (authUser.status === "fail") {
          return { error: authUser.message as FetchBaseQueryError };
        }

        dispatch(setAuthUser(authUser.data.user));
        return { data: authUser as GetOwnProfileResponse };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSetIsPreloadQuery } = extendedApi;

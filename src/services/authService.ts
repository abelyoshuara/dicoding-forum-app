import { BASE_URL, api } from "./api";
import { getAccessToken, putAccessToken } from "../utils";
import { setAuthUser } from "../redux/authUser/authUserSlice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GetOwnProfileResponse } from "../interfaces/responses";
import { LoginRequest } from "../interfaces/requests";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    setAuthUser: build.mutation<GetOwnProfileResponse, LoginRequest>({
      queryFn: async ({ email, password }, { dispatch }) => {
        const loginResponse = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { data, status, message } = await loginResponse.json();
        if (status === "fail") {
          return { error: message as FetchBaseQueryError };
        }

        putAccessToken(data.token);

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

export const { useSetAuthUserMutation } = extendedApi;

import { api } from "./api";
import { User } from "../interfaces/attributes";
import {
  ErrorResponse,
  GetUsersResponse,
  RegisterResponse,
} from "../interfaces/responses";
import { RegisterRequest } from "../interfaces/requests";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
      transformResponse: (response: GetUsersResponse) => response.data.users,
    }),
    register: build.mutation<RegisterResponse, Partial<RegisterRequest>>({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformErrorResponse: (response: ErrorResponse) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useRegisterMutation } = extendedApi;

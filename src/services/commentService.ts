import { api } from "./api";
import { CreateCommentResponse, ErrorResponse } from "../interfaces/responses";
import { AddCommentRequest } from "../interfaces/requests";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation<CreateCommentResponse, AddCommentRequest>({
      query(data) {
        const { threadId, ...body } = data;
        return {
          url: `/threads/${threadId}/comments`,
          method: "POST",
          body,
        };
      },
      transformErrorResponse: (response: ErrorResponse) => response.data,
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useAddCommentMutation } = extendedApi;

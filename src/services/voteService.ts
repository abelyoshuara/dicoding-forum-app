import { api } from "./api";
import {
  ErrorResponse,
  VoteCommentResponse,
  VoteThreadResponse,
} from "../interfaces/responses";
import { VoteCommentRequest } from "../interfaces/requests";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    upVoteThread: build.mutation<VoteThreadResponse, string>({
      query(threadId) {
        return {
          url: `/threads/${threadId}/up-vote`,
          method: "POST",
        };
      },
      transformErrorResponse: (response: ErrorResponse) => response.data,
      invalidatesTags: [{ type: "Votes", id: "LIST" }],
    }),
    downVoteThread: build.mutation<VoteThreadResponse, string>({
      query(threadId) {
        return {
          url: `/threads/${threadId}/down-vote`,
          method: "POST",
        };
      },
      transformErrorResponse: (response: ErrorResponse) => response.data,
      invalidatesTags: [{ type: "Votes", id: "LIST" }],
    }),
    neutralizeThreadVote: build.mutation<VoteThreadResponse, string>({
      query(threadId) {
        return {
          url: `/threads/${threadId}/neutral-vote`,
          method: "POST",
        };
      },
      transformErrorResponse: (response: ErrorResponse) => response.data,
      invalidatesTags: [{ type: "Votes", id: "LIST" }],
    }),
    upVoteComment: build.mutation<
      VoteCommentResponse,
      Partial<VoteCommentRequest>
    >({
      query({ threadId, commentId }) {
        return {
          url: `/threads/${threadId}/comments/${commentId}/up-vote`,
          method: "POST",
        };
      },
      transformErrorResponse: (response: ErrorResponse) => response.data,
      invalidatesTags: [{ type: "Votes", id: "LIST" }],
    }),
    downVoteComment: build.mutation<
      VoteCommentResponse,
      Partial<VoteCommentRequest>
    >({
      query({ threadId, commentId }) {
        return {
          url: `/threads/${threadId}/comments/${commentId}/down-vote`,
          method: "POST",
        };
      },
      transformErrorResponse: (response: ErrorResponse) => response.data,
      invalidatesTags: [{ type: "Votes", id: "LIST" }],
    }),
    neutralizeCommentVote: build.mutation<
      VoteCommentResponse,
      Partial<VoteCommentRequest>
    >({
      query({ threadId, commentId }) {
        return {
          url: `/threads/${threadId}/comments/${commentId}/neutral-vote`,
          method: "POST",
        };
      },
      transformErrorResponse: (response: ErrorResponse) => response.data,
      invalidatesTags: [{ type: "Votes", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpVoteThreadMutation,
  useDownVoteThreadMutation,
  useNeutralizeThreadVoteMutation,
  useUpVoteCommentMutation,
  useDownVoteCommentMutation,
  useNeutralizeCommentVoteMutation,
} = extendedApi;

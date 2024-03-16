import {
  Comment,
  Leaderboard,
  OwnerDetailThread,
  Thread,
  User,
} from "./attributes";

export interface CommonResponse {
  status: string;
  message: string;
}

export interface ErrorResponse {
  status: number;
  data: CommonResponse & {
    data: object;
  };
}

export interface RegisterResponse extends CommonResponse {
  data: {
    user: User;
  };
}

export interface LoginResponse extends CommonResponse {
  data: {
    token: string;
  };
}

export interface GetUsersResponse extends CommonResponse {
  data: {
    users: User[];
  };
}

export interface GetOwnProfileResponse extends CommonResponse {
  data: {
    user: User;
  };
}

export interface CreateThreadResponse extends CommonResponse {
  data: {
    thread: Thread;
  };
}

export interface GetThreadsResponse extends CommonResponse {
  data: {
    threads: Thread[];
  };
}

export interface GetThreadResponse extends CommonResponse {
  data: {
    detailThread: {
      id: string;
      title: string;
      body: string;
      category: string;
      createdAt: string;
      owner: OwnerDetailThread;
      upVotesBy: string[];
      downVotesBy: string[];
      comments: Comment[];
    };
  };
}

export interface CreateCommentResponse extends CommonResponse {
  data: {
    comment: {
      id: string;
      content: string;
      createdAt: string;
      upVotesBy: string[];
      downVotesBy: string[];
      owner: OwnerDetailThread;
    };
  };
}

export enum VoteType {
  UpVote = 1,
  DownVote = -1,
  Neutral = 0,
}

export interface VoteResponse<T> extends CommonResponse {
  data: {
    vote: {
      id: string;
      userId: string;
      voteType: VoteType;
    } & T;
  };
}

export interface VoteThreadResponse
  extends VoteResponse<{ threadId: string }> {}

export interface VoteCommentResponse
  extends VoteResponse<{ commentId: string }> {}

export interface GetLeaderboardsResponse extends CommonResponse {
  data: {
    leaderboards: Leaderboard[];
  };
}

export interface PopulateThreadsAndUsersResponse {
  data: {
    threads: Thread[];
    users: User[];
  };
}

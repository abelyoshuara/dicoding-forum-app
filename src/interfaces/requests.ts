export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface AddThreadRequest {
  title: string;
  category: string;
  body: string;
}

export interface AddCommentRequest {
  threadId: string;
  content: string;
}

export interface VoteCommentRequest {
  threadId: string;
  commentId: string;
}

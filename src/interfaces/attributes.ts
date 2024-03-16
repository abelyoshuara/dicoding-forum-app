export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
}

export interface OwnerDetailThread {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  owner: OwnerDetailThread;
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface DetailThread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: OwnerDetailThread;
  upVotesBy: string[];
  downVotesBy: string[];
  comments: Comment[];
}

export interface Leaderboard {
  user: User;
  score: number;
}

export interface ThreadWithUser extends Thread {
  user: User | null;
  authUser: string;
}

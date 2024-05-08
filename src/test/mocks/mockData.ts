export const mockData = {
  getThreads: {
    status: "success",
    message: "ok",
    data: {
      threads: [
        {
          id: "thread-1",
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          ownerId: "users-1",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: "thread-2",
          title: "Thread Kedua",
          body: "Ini adalah thread kedua",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          ownerId: "users-2",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    },
  },
  getUsers: {
    status: "success",
    message: "ok",
    data: {
      users: [
        {
          id: "john_doe",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg",
        },
        {
          id: "jane_doe",
          name: "Jane Doe",
          email: "jane@example.com",
          avatar: "https://generated-image-url.jpg",
        },
        {
          id: "fulan",
          name: "Si Fulan",
          email: "fulan@example.com",
          avatar: "https://generated-image-url.jpg",
        },
      ],
    },
  },
  useGetLeaderboardsQuery: {
    status: "success",
    message: "ok",
    data: {
      leaderboards: [
        {
          user: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://generated-image-url.jpg",
          },
          score: 10,
        },
        {
          user: {
            id: "users-2",
            name: "Jane Doe",
            email: "jane@example.com",
            avatar: "https://generated-image-url.jpg",
          },
          score: 5,
        },
      ],
    },
  },
};

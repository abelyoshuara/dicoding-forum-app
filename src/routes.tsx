import Root from "./Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ThreadDetailPage from "./pages/ThreadDetailPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CounterPage from "./pages/CounterPage";

export default [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "threads/:threadId",
        element: <ThreadDetailPage />,
      },
      {
        path: "leaderboards",
        element: <LeaderboardPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "counter",
        element: <CounterPage />,
      },
    ],
  },
];

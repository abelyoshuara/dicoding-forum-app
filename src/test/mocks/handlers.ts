import { http, HttpResponse } from "msw";
import { mockData } from "./mockData";
const BASEURL = "https://forum-api.dicoding.dev/v1";

// Describe the network.
export const handlers = [
  http.get(`${BASEURL}/threads`, () => {
    return HttpResponse.json(mockData.getThreads);
  }),

  http.get(`${BASEURL}/users`, () => {
    return HttpResponse.json(mockData.getUsers);
  }),

  http.get(`${BASEURL}/leaderboards`, () => {
    return HttpResponse.json(mockData.useGetLeaderboardsQuery);
  }),
];

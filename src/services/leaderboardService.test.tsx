/**
 * scenario testing
 *
 * - Leaderboard service:
 *   - should get all the top users with the highest score.
 */

import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { mockData } from "../test/mocks/mockData";
import { store } from "../redux/store";
import { act } from "react";
import { useGetLeaderboardsQuery } from "./leaderboardService";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("Leaderboard service", () => {
  it("should get all the top users with the highest score.", async () => {
    const { result, waitFor } = renderHook(() => useGetLeaderboardsQuery(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).toEqual(
      mockData.useGetLeaderboardsQuery.data.leaderboards,
    );
  });
});

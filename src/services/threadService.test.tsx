/**
 * scenario testing
 *
 * - Thread service:
 *   - should get all threads data
 */

import { renderHook } from "@testing-library/react-hooks";
import { useGetThreadsQuery } from "./threadService";
import { Provider } from "react-redux";
import { mockData } from "../test/mocks/mockData";
import { store } from "../redux/store";
import { act } from "react";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("Thread service", () => {
  it("should get all threads data", async () => {
    const { result, waitFor } = renderHook(() => useGetThreadsQuery(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).toEqual(mockData.getThreads.data.threads);
  });
});

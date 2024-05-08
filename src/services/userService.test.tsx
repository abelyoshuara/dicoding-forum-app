/**
 * scenario testing
 *
 * - User service:
 *   - should get all users data
 */

import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { mockData } from "../test/mocks/mockData";
import { store } from "../redux/store";
import { act } from "react";
import { useGetUsersQuery } from "./userService";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("User service", () => {
  it("should get all users data", async () => {
    const { result, waitFor } = renderHook(() => useGetUsersQuery(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).toEqual(mockData.getUsers.data.users);
  });
});

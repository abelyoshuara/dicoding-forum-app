/**
 * test scenario for authUserSlice
 *
 * - authUserSlice function
 * - should return the initial state
 * - should return the authUser after the setAuthUser function was called
 * - should return the initial state after the unsetAuthUser function was called
 */

import reducer, {
  initialState,
  setAuthUser,
  unsetAuthUser,
} from "./authUserSlice";
import { User } from "../../interfaces/attributes";

describe("authUserSlice function", () => {
  it("should return the initial state", () => {
    // arrange
    const action = { type: "UNKNOWN" };

    // action
    const nextState = reducer(undefined, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the authUser after the setAuthUser function was called", () => {
    // arrange
    const action = setAuthUser({
      id: "id-test",
      name: "name-test",
      email: "email-test",
      avatar: "avatar-test",
    });

    // action
    const nextState = reducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      id: "id-test",
      name: "name-test",
      email: "email-test",
      avatar: "avatar-test",
    });
  });

  it("should return the initial state after the unsetAuthUser function was called", () => {
    // arrange
    const previousState: User = {
      id: "user-x",
      name: "name-test",
      email: "email-test",
      avatar: "avatar-test",
    };
    const action = unsetAuthUser();

    // action
    const nextState = reducer(previousState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });
});

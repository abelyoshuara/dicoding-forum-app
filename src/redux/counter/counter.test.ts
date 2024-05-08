/**
 * test scenario for counterSlice
 *
 * - counterSlice function
 * - should return the initial state
 * - should return 1 after the increment function was called
 * - should return 0 after the decrement function was called
 * - should return 5 after the incrementByAmount function was called
 */

import reducer, {
  decrement,
  increment,
  incrementByAmount,
  initialState,
} from "./counterSlice";

describe("counterSlice function", () => {
  it("should return the initial state", () => {
    // arrange
    const action = { type: "UNKNOWN" };

    // action
    const nextState = reducer(undefined, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return 1 after the increment function was called", () => {
    // arrange
    const action = increment();

    // action
    const nextState = reducer(initialState, action);

    // assert
    expect(nextState.value).toEqual(1);
  });

  it("should return 0 after the decrement function was called", () => {
    // arrange
    const previousState = { value: 1 };
    const action = decrement();

    // action
    const nextState = reducer(previousState, action);

    // assert
    expect(nextState.value).toEqual(0);
  });

  it("should return 5 after the incrementByAmount function was called", () => {
    // arrange
    const previousState = { value: 1 };
    const action = incrementByAmount(4);

    // action
    const nextState = reducer(previousState, action);

    // assert
    expect(nextState.value).toEqual(5);
  });
});

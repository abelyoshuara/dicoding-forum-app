/**
 * scenario testing
 *
 * - Header component
 *   - should display navbar correctly
 *   - should display login and register button when user is not authenticated
 *   - should display image profile when user is authenticated
 */

import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "../utils/test-utils";
import authUserReducer, { setAuthUser } from "../redux/authUser/authUserSlice";
import Header from "./Header";
import { Provider } from "react-redux";

describe("Header component", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        authUser: authUserReducer,
      },
    });
  });

  it("should display navbar correctly", () => {
    render(<Header />);

    const logo = screen.getByText("Dicoding Forum");

    expect(logo).toBeInTheDocument();
  });

  it("should display login and register button when user is not authenticated", () => {
    render(<Header />);

    const btnLogin = screen.getByText(/LOgin/i);
    const btnRegister = screen.getByText(/registER/i);

    expect(btnLogin).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it("should display image profile when user is authenticated", () => {
    store.dispatch(
      setAuthUser({
        id: "user-1",
        name: "user-name",
        email: "user-email",
        avatar: "user-avatar",
      }),
    );

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    const profileImage = screen.getByTestId("user-email");

    expect(profileImage).toBeInTheDocument();
  });
});

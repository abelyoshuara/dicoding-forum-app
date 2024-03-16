/**
 * scenario testing
 *
 * - LoginInput component
 *   - should the email input be displayed
 *   - should the password input be displayed
 *   - should the login button be displayed
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { render, screen, userEvent } from "../utils/test-utils";
import LoginInput from "./LoginInput";

describe("LoginInput component", () => {
  it("should the email input be displayed", () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} isLoading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");

    // Action

    // Assert
    expect(emailInput).toBeInTheDocument();
  });

  it("should the password input be displayed", () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} isLoading={false} />);
    const passwordInput = screen.getByPlaceholderText("Password");

    // Action

    // Assert
    expect(passwordInput).toBeInTheDocument();
  });

  it("should the login button be displayed", () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} isLoading={false} />);
    const loginButton = screen.getByRole("button", { name: "Login" });

    // Action

    // Assert
    expect(loginButton).toBeInTheDocument();
  });

  it("should handle email typing correctly", async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} isLoading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");

    // Action
    await userEvent.type(emailInput, "emailtest@test.com");

    // Assert
    expect(emailInput).toHaveValue("emailtest@test.com");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} isLoading={false} />);
    const passwordInput = screen.getByPlaceholderText("Password");

    // Action
    await userEvent.type(passwordInput, "passwordtest");

    // Assert
    expect(passwordInput).toHaveValue("passwordtest");
  });

  it("should call login function when login button is clicked", async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput onLogin={mockLogin} isLoading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "emailtest@test.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordtest");
    const loginButton = screen.getByRole("button", { name: "Login" });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: "emailtest@test.com",
      password: "passwordtest",
    });
  });
});

/**
 * scenario testing
 *
 * - RegisterInput component
 *   - should the name input be displayed
 *   - should the email input be displayed
 *   - should the password input be displayed
 *   - should the register button be displayed
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should show 'This field is required' when name input is empty
 *   - should show 'This field is required' when email input is empty
 *   - should show 'This field is required' when password input is empty
 *   - should show 'This field must be at least 4 digits' when the password is less than 4 characters
 *   - should call register function when register button is clicked
 */
import { render, screen, userEvent } from "../utils/test-utils";
import RegisterInput from "./RegisterInput";

describe("RegisterInput component", () => {
  it("should the name input be displayed", () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const nameInput = screen.getByPlaceholderText("Name");

    // Action

    // Assert
    expect(nameInput).toBeInTheDocument();
  });

  it("should the email input be displayed", () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");

    // Action

    // Assert
    expect(emailInput).toBeInTheDocument();
  });

  it("should the password input be displayed", () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const passwordInput = screen.getByPlaceholderText("Password");

    // Action

    // Assert
    expect(passwordInput).toBeInTheDocument();
  });

  it("should the register button be displayed", () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const registerButton = screen.getByRole("button", { name: "Register" });

    // Action

    // Assert
    expect(registerButton).toBeInTheDocument();
  });

  it("should handle name typing correctly", async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const nameInput = screen.getByPlaceholderText("Name");

    // Action
    await userEvent.type(nameInput, "nametest");

    // Assert
    expect(nameInput).toHaveValue("nametest");
  });

  it("should handle email typing correctly", async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");

    // Action
    await userEvent.type(emailInput, "emailtest@test.com");

    // Assert
    expect(emailInput).toHaveValue("emailtest@test.com");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const passwordInput = screen.getByPlaceholderText("Password");

    // Action
    await userEvent.type(passwordInput, "passwordtest");

    // Assert
    expect(passwordInput).toHaveValue("passwordtest");
  });

  it("should show 'This field is required' when name input is empty", async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const nameInput = screen.getByPlaceholderText("Name");
    const registerButton = screen.getByRole("button", { name: "Register" });

    // Action
    await userEvent.clear(nameInput);
    await userEvent.click(registerButton);

    // Assert
    const text = await screen.findByTestId("errName");
    expect(text).toBeInTheDocument();
  });

  it("should show 'This field is required' when email input is empty", async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const emailInput = screen.getByPlaceholderText("Email");
    const registerButton = screen.getByRole("button", { name: "Register" });

    // Action
    await userEvent.clear(emailInput);
    await userEvent.click(registerButton);

    // Assert
    const text = await screen.findByTestId("errEmail");
    expect(text).toBeInTheDocument();
  });

  it("should show 'This field is required' when password input is empty", async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const passwordInput = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByRole("button", { name: "Register" });

    // Action
    await userEvent.clear(passwordInput);
    await userEvent.click(registerButton);

    // Assert
    const text = await screen.findByTestId("errPassword");
    expect(text).toBeInTheDocument();
  });

  it("should show 'This field must be at least 4 digits' when the password is less than 4 characters", async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} isLoading={false} />);
    const passwordInput = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByRole("button", { name: "Register" });

    // Action
    await userEvent.type(passwordInput, "123");
    await userEvent.click(registerButton);

    // Assert
    const text = await screen.findByTestId("errPassword");
    expect(text).toBeInTheDocument();
  });

  it("should call register function when register button is clicked", async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput onRegister={mockRegister} isLoading={false} />);
    const nameInput = screen.getByPlaceholderText("Name");
    await userEvent.type(nameInput, "nametest");
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "emailtest@test.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordtest");
    const registerButton = screen.getByRole("button", { name: "Register" });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: "nametest",
      email: "emailtest@test.com",
      password: "passwordtest",
    });
  });
});

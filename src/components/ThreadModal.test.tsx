/**
 * scenario testing
 *
 * - ThreadModal component
 *   - should the title input be displayed
 *   - should the category input be displayed
 *   - should the content input be displayed
 *   - should the save button be displayed
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle content typing correctly
 *   - should show 'This field is required' when title input is empty
 *   - should show 'This field is required' when category input is empty
 *   - should show 'This field is required' when content input is empty
 */
import { render, screen, userEvent } from "../utils/test-utils";
import ThreadModal from "./ThreadModal";

describe("RegisterInput component", () => {
  it("should the title input be displayed", () => {
    // Arrange
    render(<ThreadModal />);
    const titleInput = screen.getByPlaceholderText("Title");

    // Action

    // Assert
    expect(titleInput).toBeInTheDocument();
  });

  it("should the category input be displayed", () => {
    // Arrange
    render(<ThreadModal />);
    const categoryInput = screen.getByPlaceholderText("Category");

    // Action

    // Assert
    expect(categoryInput).toBeInTheDocument();
  });

  it("should the content input be displayed", () => {
    // Arrange
    render(<ThreadModal />);
    const contentInput = screen.getByPlaceholderText("Content");

    // Action

    // Assert
    expect(contentInput).toBeInTheDocument();
  });

  it("should the save button be displayed", () => {
    // Arrange
    render(<ThreadModal />);
    const saveButton = screen.getByRole("button", { name: "Save" });

    // Action

    // Assert
    expect(saveButton).toBeInTheDocument();
  });

  it("should handle title typing correctly", async () => {
    // Arrange
    render(<ThreadModal />);
    const titleInput = screen.getByPlaceholderText("Title");

    // Action
    await userEvent.type(titleInput, "titletest");

    // Assert
    expect(titleInput).toHaveValue("titletest");
  });

  it("should handle category typing correctly", async () => {
    // Arrange
    render(<ThreadModal />);
    const categoryInput = screen.getByPlaceholderText("Category");

    // Action
    await userEvent.type(categoryInput, "categorytest");

    // Assert
    expect(categoryInput).toHaveValue("categorytest");
  });

  it("should handle content typing correctly", async () => {
    // Arrange
    render(<ThreadModal />);
    const contentInput = screen.getByPlaceholderText("Content");

    // Action
    await userEvent.type(contentInput, "contenttest");

    // Assert
    expect(contentInput).toHaveValue("contenttest");
  });

  it("should show 'This field is required' when title input is empty", async () => {
    // Arrange
    render(<ThreadModal />);
    const titleInput = screen.getByPlaceholderText("Title");
    const saveButton = screen.getByRole("button", { name: "Save" });

    // Action
    await userEvent.clear(titleInput);
    await userEvent.click(saveButton);

    // Assert
    const text = await screen.findByTestId("errTitle");
    expect(text).toBeInTheDocument();
  });

  it("should show 'This field is required' when category input is empty", async () => {
    // Arrange
    render(<ThreadModal />);
    const categoryInput = screen.getByPlaceholderText("Category");
    const saveButton = screen.getByRole("button", { name: "Save" });

    // Action
    await userEvent.clear(categoryInput);
    await userEvent.click(saveButton);

    // Assert
    const text = await screen.findByTestId("errCategory");
    expect(text).toBeInTheDocument();
  });

  it("should show 'This field is required' when content input is empty", async () => {
    // Arrange
    render(<ThreadModal />);
    const contentInput = screen.getByPlaceholderText("Content");
    const saveButton = screen.getByRole("button", { name: "Save" });

    // Action
    await userEvent.clear(contentInput);
    await userEvent.click(saveButton);

    // Assert
    const text = await screen.findByTestId("errContent");
    expect(text).toBeInTheDocument();
  });
});

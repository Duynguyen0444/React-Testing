import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "~/components/SignUpForm/SignUpForm";

describe("SignUpForm Component", () => {
  it("should fill inputs with default values initially", () => {
    render(
      <SignUpForm
        onSubmit={jest.fn()}
        defaultValues={{ email: "test@example.com", password: "password123" }}
      />
    );

    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue(
      "test@example.com"
    );
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue(
      "password123"
    );
  });

  it("should show required error messages when fields are empty and form is submitted", async () => {
    const mockOnSubmitFn = jest.fn();
    render(<SignUpForm onSubmit={mockOnSubmitFn} />);

    await userEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();

    // mockOnSubmitFn should not be called
    expect(mockOnSubmitFn).not.toHaveBeenCalled();
  });

  it("should show invalid email and short password error messages", async () => {
    const mockOnSubmitFn = jest.fn();
    render(<SignUpForm onSubmit={mockOnSubmitFn} />);

    // Noti cho userEvent.type đang input vào textField có placeholder là "Enter email" và "Enter password"
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      "invalid-email"
    );
    await userEvent.type(screen.getByPlaceholderText(/enter password/i), "123");
    await userEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText(/email is not valid/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  it("should call onSubmit with correct data and reset form on successful submission", async () => {
    const mockOnSubmitFn = jest.fn();

    render(<SignUpForm onSubmit={mockOnSubmitFn} />);
    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByText(/submit/i);

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    // Verify inputs have correct values
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");

    await userEvent.click(submitButton);

    expect(mockOnSubmitFn).toHaveBeenCalledTimes(1);
    expect(mockOnSubmitFn).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue("");
  });
});

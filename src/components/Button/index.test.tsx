import { Button } from "~/components/Button/Button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button Component", () => {
  it("should render and click the button", async () => {
    // Create user instance
    const user = userEvent.setup();  
    const onClick = jest.fn();

    // Mount component <Button/> virtual DOM in environment test
    render(<Button content="Click Me" onClick={onClick} />);

    // getByRole: get element by role="button"
    const button = screen.getByRole("button", { name: /click me/i });

    await user.click(button);

    // Check that button is in the document (not unmounted)
    expect(button).toBeInTheDocument();

    // Check that onClick has been called once
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "~/components/Counter/Counter";
describe("Counter Component", () => {
  it("should increment and decrement value ensuring it doesn't go negative", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole("button", { name: "+" });
    const decrementButton = screen.getByRole("button", { name: "-" });

    // Increase count to 2
    await user.click(incrementButton);
    await user.click(incrementButton);

    // Decrease count to 3 - Make sure value is not negative
    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(decrementButton);

    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });
});

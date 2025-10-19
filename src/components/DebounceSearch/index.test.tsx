import { DebounceSearch } from "~/components/DebounceSearch/DebounceSearch";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DebounceSearch Component", () => {
  it("should fetch user after debounce", async () => {
    // Mock call api với query cụ thể hoặc không query
    // mockImplementation: Gán cùng một logic mock cho tất cả các lần gọi mock fetch
    jest.spyOn(globalThis, "fetch").mockImplementation(async (url: any) => {
      if (url.includes("abc")) {
        return {
          json: async () => [{ id: 1, name: "ABC User" }],
        };
      }
      return {
        json: async () => [],
      } as any;
    });

    render(<DebounceSearch />);

    // Lần đầu gọi fetch khi mount component với query rỗng
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("users?q=")
    );

    await userEvent.type(screen.getByPlaceholderText(/search/i), "abc");

    // Chờ debounce 500ms để gọi lần 2
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    // use findByText để chờ element xuất hiện sau khi fetch xong
    expect(await screen.findByText(/ABC User/i)).toBeInTheDocument();

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("users?q=abc")
    );
  });

  it("should not show result when fetch error", async () => {
    jest
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new Error("Fetch error"));

    render(<DebounceSearch />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/no result/i)).toBeInTheDocument();
  });
});

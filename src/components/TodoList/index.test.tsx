import { render, screen } from "@testing-library/react";
import { TodoList, type Todo } from "~/components/TodoList/TodoList";

const mockTodos: Todo[] = [
  { id: 1, todo: "Test Todo 1", completed: false, userId: 1 },
  { id: 2, todo: "Test Todo 2", completed: true, userId: 2 },
  { id: 3, todo: "Test Todo 3", completed: false, userId: 3 },
];

describe("TodoList Component", () => {
  it("should fetch and display todos", async () => {
    // globalThis: Biến toàn cục trong mọi môi trường (browser, nodejs)
    // jest.spyOn: Tạo mock function từ hàm có sẵn (ở đây là fetch)
    // mockResolvedValueOnce: Lần gọi fetch tiếp theo trả về Promise.reolve với object đã tạo
    jest.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ todos: mockTodos }),
    } as any);

    render(<TodoList />);

    // getByText: chạy đồng bộ(sync) dùng khi chắc chắn element đã có sẵn trong DOM,
    // Kiểm tra chữ loading trên màn hình
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // findByText: chạy bất đồng bộ(async) trả về Promise, chờ element cho tới khi được xuất hiện
    // trong DOM,
    for (const todo of mockTodos) {
      expect(await screen.findByText(todo.todo)).toBeInTheDocument();
    }
  });

  it("should display no result when fetch error", async () => {
    jest
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new Error("Fetch error"));

    render(<TodoList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/No result!/i)).toBeInTheDocument();
  });
});

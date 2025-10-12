import { sum } from "~/utils/sum";

describe("Unit test: sum function", () => {
  it("should return the sum of two numbers", () => {
    expect(sum(10, 19)).toBe(29);
  });
});

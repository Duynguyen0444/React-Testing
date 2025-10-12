import { mapOrder } from "~/utils/mapOrder";

describe("mapOrder", () => {
  it("should return [] if originalArray is empty", () => {
    expect(mapOrder(null as any, [1, 2, 3], "id")).toEqual([]);
  });

  it("should return [] if orderArray is empty", () => {
    expect(mapOrder([1, 2, 3], null as any, "id")).toEqual([]);
  });

  it("should return [] if key is falsy", () => {
    expect(mapOrder([1, 2, 3], [1, 2, 3], "")).toEqual([]);
  });

  it("should sort array by given order", () => {
    const originalArray = [
      { id: 3, name: "Item 3" },
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const orderArray = [1, 2, 3];
    const result = mapOrder(originalArray, orderArray, "id");
    expect(result.map((item) => item.id)).toEqual([1, 2, 3]);
  });

  it("should push items not in orderArray to the end", () => {
    const originalArray = [
      { id: 3, name: "Item 3" },
      { id: 1, name: "Item 1" },
      { id: 4, name: "Item 4" },
      { id: 2, name: "Item 2" },
      { id: 6, name: "Item 6" },
      { id: 8, name: "Item 8" },
    ];

    const orderArray = [1, 2, 3, 4];
    const result = mapOrder(originalArray, orderArray, "id");
    expect(result.map((item) => item.id)).toEqual([1, 2, 3, 4, 6, 8]);
  });

  it("should handle when all items are not in orderArray", () => {
    const originalArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const orderArray: number[] = [];

    const result = mapOrder(originalArray, orderArray, "id");
    expect(result.map((item) => item.id)).toEqual([1, 2, 3]);
  });

  it("should work with custom key", () => {
    const originalArray = [
      { code: "D", name: "Item D" },
      { code: "A", name: "Item A" },
      { code: "C", name: "Item C" },
      { code: "B", name: "Item B" },
    ];
    const orderArray = ["A", "B", "C", "D"];

    const result = mapOrder(originalArray, orderArray, "code");
    expect(result.map((item) => item.code)).toEqual(["A", "B", "C", "D"]);
  });
});

import { validateEmail } from "~/utils/validateEmail";

describe("validateEmail", () => {
  const cases: any[] = [
    ["Abc@gmail.com", true],
    ["abc@", false],
    [" abc@gmail", false],
    [{ email: "abc@gmail.com" }, false],
  ];

  it.each(cases)("%p => %p", (email, expected) => {
    expect(validateEmail(email)).toBe(expected);
  });
});

import { render } from "@testing-library/react";
import Connection from ".";

test("renders connection component", () => {
  render(<Connection />);
});

test("shows no internet connection on render", () => {
  const { getByTestId } = render(<Connection />);
  expect(getByTestId(/message/i).textContent).toBe("🍕 No Internet Connection.");
});

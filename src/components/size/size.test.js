import { render } from "@testing-library/react";
import Size from ".";

test("renders size component", () => {
  render(<Size onGetSelectedSize={() => {}} data={[]} />);
});

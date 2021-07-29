import { render } from "@testing-library/react";
import Toppings from ".";

test("renders toppings component", () => {
  render(<Toppings onGetSelectedTopping={() => {}} data={[]} />);
});

import { render, screen } from "@testing-library/react";
import App from "../App";
test("renders app title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Three Tier Demo Application/i);
  expect(linkElement).toBeInTheDocument();
});

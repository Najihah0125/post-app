import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

test("renders button with label and handles click", () => {
  const handleClick = jest.fn();

  render(<Button label="Click me" type="button" className="primary-button" onClick={handleClick} isDirty={true} />);

  // Check if button is in the document
  const buttonElement = screen.getByText("Click me");
  expect(buttonElement).toBeInTheDocument();

  // click event
  fireEvent.click(buttonElement);

  // Verify if the click handler was called once
  expect(handleClick).toHaveBeenCalledTimes(1);
});

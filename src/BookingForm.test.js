import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookingForm from "./BookingForm";
import { initializeTimes, updateTimes } from "../App";

function renderBookingForm(overrides = {}) {
  const props = {
    availableTimes: initializeTimes(),
    dispatch: jest.fn(),
    submitForm: jest.fn(() => true),
    ...overrides,
  };

  render(
    <BrowserRouter>
      <BookingForm {...props} />
    </BrowserRouter>
  );

  return props;
}

test("renders the BookingForm heading", () => {
  renderBookingForm();
  const headingElement = screen.getByText("Reserve a table");
  expect(headingElement).toBeInTheDocument();
});

test("renders all available times as options", () => {
  const times = ["17:00", "18:00", "19:00"];
  renderBookingForm({ availableTimes: times });

  times.forEach((time) => {
    expect(screen.getByRole("option", { name: time })).toBeInTheDocument();
  });
});

test("submit button is disabled until the form is valid", () => {
  renderBookingForm();
  const submitButton = screen.getByRole("button", { name: /make your reservation/i });
  expect(submitButton).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2026-09-10" },
  });
  fireEvent.change(screen.getByLabelText(/choose time/i), {
    target: { value: "18:00" },
  });
  fireEvent.change(screen.getByLabelText(/number of guests/i), {
    target: { value: "2" },
  });
  fireEvent.change(screen.getByLabelText(/occasion/i), {
    target: { value: "Birthday" },
  });

  expect(submitButton).not.toBeDisabled();
});

test("shows a validation error when guests exceeds the max", () => {
  renderBookingForm();

  const guestsInput = screen.getByLabelText(/number of guests/i);
  fireEvent.change(guestsInput, { target: { value: "20" } });
  fireEvent.blur(guestsInput);

  expect(
    screen.getByText(/for parties over 10, please call the restaurant/i)
  ).toBeInTheDocument();
});

test("dispatch is called with UPDATE_TIMES when the date changes", () => {
  const { dispatch } = renderBookingForm();
  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2026-09-15" },
  });

  expect(dispatch).toHaveBeenCalledWith({
    type: "UPDATE_TIMES",
    date: "2026-09-15",
  });
});

/* -------------------------------------------------------------- */
/*  Reducer unit tests                                            */
/* -------------------------------------------------------------- */

describe("updateTimes reducer", () => {
  test("initializeTimes returns a non-empty array of times", () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  test("returns state unchanged for an unknown action type", () => {
    const state = initializeTimes();
    const result = updateTimes(state, { type: "UNKNOWN_ACTION" });
    expect(result).toEqual(state);
  });

  test("UPDATE_TIMES returns a valid list of times for a given date", () => {
    const state = initializeTimes();
    const result = updateTimes(state, {
      type: "UPDATE_TIMES",
      date: "2026-09-12",
    });
    expect(result).toHaveLength(state.length);
    expect(result.sort()).toEqual(state.sort());
  });
});

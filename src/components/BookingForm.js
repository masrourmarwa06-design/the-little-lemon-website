import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";

const OCCASIONS = ["Birthday", "Anniversary", "Engagement", "Other"];

const initialFormState = {
  date: "",
  time: "",
  guests: 1,
  occasion: OCCASIONS[0],
};

function validate(values) {
  const errors = {};

  if (!values.date) {
    errors.date = "Please choose a date.";
  }

  if (!values.time) {
    errors.time = "Please choose a time.";
  }

  const guests = Number(values.guests);
  if (!values.guests || Number.isNaN(guests)) {
    errors.guests = "Please enter the number of guests.";
  } else if (guests < 1) {
    errors.guests = "At least 1 guest is required.";
  } else if (guests > 10) {
    errors.guests = "For parties over 10, please call the restaurant.";
  }

  if (!values.occasion) {
    errors.occasion = "Please select an occasion.";
  }

  return errors;
}

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (name === "date") {
      dispatch({ type: "UPDATE_TIMES", date: value });
    }

    setErrors(validate(nextValues));
  };

  const handleBlur = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const isFormValid = Object.keys(validate(values)).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ date: true, time: true, guests: true, occasion: true });

    if (Object.keys(validationErrors).length === 0) {
      const success = submitForm(values);
      if (success) {
        navigate("/booking-confirmed");
      }
    }
  };

  return (
    <section className="booking container">
      <h1 className="section-title">Reserve a table</h1>
      <form
        className="booking-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Table reservation form"
      >
        <div className="form-field">
          <label htmlFor="res-date">Choose date</label>
          <input
            type="date"
            id="res-date"
            name="date"
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.date && errors.date)}
            aria-describedby="res-date-error"
          />
          {touched.date && errors.date && (
            <span id="res-date-error" className="field-error" role="alert">
              {errors.date}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="res-time">Choose time</label>
          <select
            id="res-time"
            name="time"
            value={values.time}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.time && errors.time)}
            aria-describedby="res-time-error"
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {touched.time && errors.time && (
            <span id="res-time-error" className="field-error" role="alert">
              {errors.time}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            max="10"
            value={values.guests}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.guests && errors.guests)}
            aria-describedby="guests-error"
          />
          {touched.guests && errors.guests && (
            <span id="guests-error" className="field-error" role="alert">
              {errors.guests}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={values.occasion}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.occasion && errors.occasion)}
            aria-describedby="occasion-error"
          >
            {OCCASIONS.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
          {touched.occasion && errors.occasion && (
            <span id="occasion-error" className="field-error" role="alert">
              {errors.occasion}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary"
          aria-label="On Click"
          disabled={!isFormValid}
        >
          Make Your reservation
        </button>
      </form>
    </section>
  );
}

export default BookingForm;

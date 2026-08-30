import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import BookingForm from "./components/BookingForm";
import ConfirmedBooking from "./components/ConfirmedBooking";
import "./App.css";

/* ------------------------------------------------------------------ */
/*  Reducer logic for available reservation times                     */
/*  Exported so it can be unit tested independently of the component  */
/* ------------------------------------------------------------------ */

export const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES": {
      const base = initializeTimes();
      if (!action.date) return base;

      const day = new Date(action.date).getDate() || 1;
      const offset = day % base.length;
      return [...base.slice(offset), ...base.slice(0, offset)];
    }
    default:
      return state;
  }
};

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [bookingDetails, setBookingDetails] = useState(null);

  const submitForm = (formData) => {
    console.log("Booking submitted:", formData);
    setBookingDetails(formData);
    return true;
  };

  return (
    <Router>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/booking"
          element={
            <BookingForm
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route
          path="/booking-confirmed"
          element={<ConfirmedBooking bookingDetails={bookingDetails} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

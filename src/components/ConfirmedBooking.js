import React from "react";
import { Link } from "react-router-dom";

function ConfirmedBooking({ bookingDetails }) {
  return (
    <section className="container" style={{ padding: "3rem 1.5rem" }}>
      <h1 className="section-title">Booking confirmed!</h1>
      {bookingDetails ? (
        <p>
          Thank you, your table for {bookingDetails.guests} guest(s) on{" "}
          {bookingDetails.date} at {bookingDetails.time} has been reserved.
        </p>
      ) : (
        <p>Your reservation has been received.</p>
      )}
      <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
        Back to home
      </Link>
    </section>
  );
}

export default ConfirmedBooking;

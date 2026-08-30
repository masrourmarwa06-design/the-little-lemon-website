import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  return (
    <main>
      <section className="hero container" id="hero">
        <div className="hero__text">
          <h1 className="section-title">Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family-owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <Link to="/booking" className="btn-primary">
            Reserve a table
          </Link>
        </div>
        {/*
          TODO: replace with a real restaurant photo. Using the existing
          logo512.png here as a temporary placeholder so the build doesn't
          reference a missing file. Add your photo to public/ and update
          this src (e.g. src="/restaurant-hero.jpg").
        */}
        <img
          src="/logo512.png"
          alt="Little Lemon restaurant food"
          className="hero__image"
        />
      </section>

      <section className="about container" id="about">
        <h2 className="section-title">Little Lemon</h2>
        <h3>Chicago</h3>
        <p>
          Founded by brothers Mario and Adrian, Little Lemon blends
          traditional Mediterranean recipes with a modern kitchen.
        </p>
      </section>

      <section className="menu container" id="menu">
        <h2 className="section-title">This week's specials</h2>
      </section>
    </main>
  );
}

export default Main;

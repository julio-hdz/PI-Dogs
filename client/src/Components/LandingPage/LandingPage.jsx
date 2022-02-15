import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'


export default function Landing() {
  return (
    <div className="landing-page">
      <section className="title">
        <h1>DOG's PI</h1>
        <h4>by Julio H.</h4>
      </section>
      <Link to="/home">
        <button>Entrar</button>
      </Link>
    </div>
  );
}

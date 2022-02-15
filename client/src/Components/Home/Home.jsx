import React from "react";
import CardContainer from "../DogCards/CardsContainer";
import FiltersPanel from "../Filters/Filters";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div>
        <FiltersPanel />
      </div>
        <CardContainer />
    </div>
  );
}

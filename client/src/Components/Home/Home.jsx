import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDogs, fetchAllTemperaments } from "../../Store/Actions";
import CardContainer from "../DogCards/CardsContainer";
import FiltersPanel from "../Filters/Filters";
import "./Home.css";

export default function Home() {
  const dogs = useSelector(state=>state.filteredDogs);
  const created = useSelector(state=>state.filterBox.onlyDb)
  const dispatch = useDispatch();
  useEffect(() => {
      if(dogs.length==0 && !created){
      dispatch(fetchAllDogs());
      dispatch(fetchAllTemperaments());
    }
    }, [dispatch, dogs.length]);
  return (
    <div className="home">
      <div>
        <FiltersPanel />
      </div>
        <CardContainer />
    </div>
  );
}

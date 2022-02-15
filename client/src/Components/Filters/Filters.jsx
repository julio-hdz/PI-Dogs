import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  changeOrder, filterDB,
  filterTemp,
  resetFilters
} from "../../Store/Actions";
import SearchBar from "../SearchBar/SearchBar";
import "./filters.css";

export default function FiltersPanel() {
  const filters = useSelector((state) => state.filterBox);
  const temperaments = useSelector((state) => state.temperamentsList);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  /////////////////// API OR DB //////////////////////////
  function handleOriginChange(e) {
    document.getElementById("order").value = "a/z";
    document.getElementById("temps").value = "default";

    dispatch(filterDB(!filters.onlyDb));
  }
  ////////////////// RESET BUTTON ////////////////////////
  function handleResetClick(e) {
    e.preventDefault();

    document.getElementById("order").value = "a/z";
    document.getElementById("temps").value = "default";
    document.getElementById("db").checked = false;
    dispatch(resetFilters());
  }
  //////////////////////   TEMPS   //////////////////////////
  function handleTempChange(e) {
    document.getElementById("order").value = "a/z";
    dispatch(filterTemp(e.target.value));
  }
  ////////////////////// ORDER //////////////////////////
  function handleOrderChange(e) {
    e.preventDefault();
    dispatch(changeOrder(e.target.value));
  }
 ///////////////////// Go to FORM ////////////////
 function navigateToForm(e) {
  e.preventDefault();
  navigate("/createDog");
}
  ////////////////////////////////////////////////////////
  return (
    <div className="panel-filters">
      <div className="searchbar">
        <button onClick={navigateToForm} >¡Crear nueva raza!</button>
        <SearchBar />
      </div>
      <div className="filters">
        <section className="temps">
          <label htmlFor="temps">Temperamento: </label>
          <select name="temps" id="temps" onChange={handleTempChange}>
            <option value="default">------</option>
            {temperaments
              ? temperaments.map((v) => {
                  return <option value={v.name} key={v.name} >{v.name}</option>;
                })
              : null}
          </select>
        </section>
        {/*////////////////////////////////// */}

        <section className="order">
          <label htmlFor="order">Ordenar por: </label>
          <select name="order" id="order" onChange={handleOrderChange}>
            <option value="a/z">A to Z</option>
            <option value="z/a">Z to A</option>
            <option value="pesoDesc">Heaviest to lightest</option>
            <option value="pesoAsc">Lightest to Heaviest</option>
          </select>
        </section>
        <section className="checkbox-db">
          <input
            type="checkbox"
            name="origin"
            id="db"
            onChange={handleOriginChange}
            checked={filters.onlyDb && true}
          />
          <label htmlFor="origin">Solo mostrar razas creadas </label>
          <br />
        </section>
        <button onClick={handleResetClick}>Cargar todas las razas</button>
      </div>
    </div>
  );
}

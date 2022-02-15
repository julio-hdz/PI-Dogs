import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogs } from "../../Store/Actions/index";
import './SearchBar.css'

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handleSearchChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function handleSearchSubmit(e) {
    e.preventDefault();
    dispatch(searchDogs(search.toLowerCase()));
    setSearch("");
  }

  return (
    <div className="searchbar-container">
      <section className="searchbar">
        <input
          type="text"
          placeholder="Buscar por raza..."
          onChange={handleSearchChange}
          value={search}
        />
        <input type="submit" value="Buscar" onClick={handleSearchSubmit} />
      </section>
    </div>
  );
}

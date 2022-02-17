import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Details.css";

export default function Details() {
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3001/dogs/" + id)
      .then((r) => setDog(r.data))
      .catch((e) => navigate('/*'));
  }, [id, navigate]);
  const tempToString = (temperaments)=>{
    let stringTemps = '';
      temperaments.forEach(element => {
        if(element.name===temperaments[0].name){
          stringTemps = element.name;
        }else{
          stringTemps += ', ' + element.name
        }
        
      })
    return stringTemps;
  }
  return (
    <div className="details">
      <button className="back" onClick={() => navigate(-1)}>
        ◄ Volver
      </button>
      <div className="containerDetails">
      {dog ? (
          <>
        <div className="detailsLeft">
          <h3>{dog.name.toUpperCase()} </h3>
          <img src={dog.image} alt="doggie" />
        </div>
          <div className="detailsRight">
            <h3>Peso: ({dog.weight})Kg </h3>
            <h3>Altura: ({dog.height})cm </h3>
            <h3>Longevidad: {dog.life_span} </h3>
            <h3>Temperamentos: {typeof(dog.temperaments)=='object'?tempToString(dog.temperaments):dog.temperaments} </h3>
          </div>
        </>
      ) : (
          <div>Loading...</div>
          )}
          </div>
    </div>
  );
}

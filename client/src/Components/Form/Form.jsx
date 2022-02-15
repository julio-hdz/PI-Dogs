import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTemperaments } from "../../Store/Actions";
import { useNavigate } from "react-router";

import "./form.css";
import DogID from "./dogID";
export default function CreateDog() {
  const temperaments = useSelector((state) => state.temperamentsList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllTemperaments());
  }, []);
  const [height, setHeight] = useState({ min: 0, max: 0 });
  const [weight, setWeight] = useState({ min: 0, max: 0 });
  const [lifeSpan, setLifeSpan] = useState({ min: "", max: "" });
  const [dog, setDog] = useState({
    name: "",
    weight: "",
    height: "",
    temperaments: [],
    life_span: "",
    image: "",
  });

  const [error, setError] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    url: ''
  });

  function handleFormReset() {
    setDog({
      name: "",
    weight: "",
    height: "",
    temperaments: [],
    life_span: "",
    image: "",
    })
    setError({
      name: "",
    weight: "",
    height: "",
    life_span: "",
    url: ''
    })
    setHeight({min: 0, max: 0});
    setLifeSpan({min: "", max: ""});
    setWeight({min: 0, max: 0});
  }
  function validateSubmit(){
    const keys1 = Object.keys(dog);
    const keys2 = Object.keys(error);
    for(let key of keys2){
      if(error[key].length>0){
        return false
      }
    }
    for(let ken of keys1){
      if(dog[ken].length==0){
        return false
      }
    }
    return true
  }

  function validateName(value) {
    if (/[\s]$/.test(value)) {
      setError({
        ...error,
        name: "El nombre no puede iniciar o terminar con un espacio vacío",
      });
    } else if (value.length < 4) {
      setError({ ...error, name: "Debe incluir al menos 4 caracteres" });
    } else if (!/^(?! )[A-Za-z ]*(?<! )$/.test(value)) {
      setError({ ...error, name: "Sólo puede incluir letras o espacios" });
    } else if (value.length > 30) {
      setError({ ...error, name: "Debe contener de 4 a 30 caracteres" });
    } else {
      setError({ ...error, name: "" });
    }
    setDog({ ...dog, name: value });
  }

  function validateMinWeight(e) {
    if (e.target.value == 0) {
      setError({
        ...error,
        weight: "Por favor ingrese un peso mínimo mayor a 0 Kg",
      });
    } else if (Number(weight.max) <= Number(e.target.value)) {
      setError({
        ...error,
        weight: "El peso minimo debe ser menor al peso máximo",
      });
    } else {
      setError({ ...error, weight: "" });
    }
    setWeight({ ...weight, min: e.target.value });
    setDog({...dog, weight: `${e.target.value} - ${weight.max}` })
  }
  function validateMaxWeight(e) {
    if (e.target.value == 0 || Number(e.target.value) <= Number(weight.min)) {
      setError({
        ...error,
        weight: "Debes ingresar un valor mayor a " + weight.min + "Kg",
      });
    } else {
      setError({ ...error, weight: "" });
    }
    setWeight({ ...weight, max: e.target.value });
    setDog({...dog, weight: `${weight.min} - ${e.target.value}` })
  }
  
  function handleTemperamentSelect(value) {
    if (!dog.temperaments.includes(value)) {
      setDog({ ...dog, temperaments: [...dog.temperaments, value] });
    }
    document.getElementById('temps').value = ''
  }
  
  function validateMinHeight(value) {
    if (value < 10) {
      setError({...error, height: "Debe ingresar un valor mínimo mayor a 10cm"});
    } else if(value >= Number(height.max)){
      setError({...error, height: "La altura mínima debe ser menor a la altura máxima" });
    }else{
      setError({...error, height: ""});
    }
    setHeight({ ...height, min: value });
    setDog({...dog, height: `${value} - ${height.max}` })
  }
  
  function validateMaxHeight(value) {
    if (value <= Number(height.min)) {
      setError({...error, height: "Debe ingresar un valor mayor a " + height.min + "cm"});
    } else {
      setError({...error, height: ""});
    }
    setHeight({ ...height, max: value });
    setDog({...dog, height: `${height.min} - ${value}` })
  }
  function validateLifeSpanMin(e){
    if(!/^(?! )[0-9]*(?<! )$/.test(e.target.value)){
      setError({...error, life_span: 'Debe ingresar solo números'})
    }else if(e.target.value>30 || e.target.value<4){
      setError({...error, life_span: 'Ingresa un valor entre 4 y 30'})
    }else if(e.target.value>=lifeSpan.max){
      lifeSpan.max==0?
      setError({...error, life_span: ''}) :
      setError({...error, life_span: 'Ingresa un valor menor'})
    }else{
      setError({...error, life_span: ''})
    }
    setLifeSpan({...lifeSpan, min: e.target.value})
    setDog({...dog, life_span: `${e.target.value} - ${lifeSpan.max}` })
  }
  function validateLifeSpanMax(e){
    if(!/^(?! )[0-9]*(?<! )$/.test(e.target.value)){
      setError({...error, life_span: 'Debe ingresar solo números'})
    }else if(Number(e.target.value)>30 || e.target.value<=4){
      setError({...error, life_span: `Ingresa un valor entre 5 y 30` })
    }else if(Number(e.target.value)<=lifeSpan.min){
      setError({...error, life_span: 'Ingresa un valor mayor a '+ lifeSpan.min})
    }else{
      setError({...error, life_span: ''})
    }
    setLifeSpan({...lifeSpan, max: e.target.value})
    setDog({...dog, life_span: `${lifeSpan.min} - ${e.target.value}` })
  }

  function submit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/api/dogs', dog).then((r)=>alert(r.data)).then(()=>handleFormReset())

  }

  function validateUrl(e){
    if(!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(e.target.value)){
      setError({...error, url: 'Ingrese una URL válida'})
    }else{
      setError({...error, url: ''})
    }
    setDog({...dog, image: e.target.value})
  }



  return (
    <div className="form">
      <form className="createDog" autoComplete="OFF" onSubmit={submit}>
        <button className="back" onClick={()=>navigate('/home')}>◄ Volver</button>
        <fieldset className="form-name">
          <section>
          <label htmlFor="name">Nombre de la raza: </label>
        <input
          name="name"
          type="text"
          placeholder="Nombre..."
          onChange={(e) => validateName(e.target.value)}
          value={dog.name}
          required
          minLength={3}
          /> 
          </section>
          {dog.name.length<1 ? <span>Ingresa un nombre!</span> : null }
        {error.name ? <span>{error.name}</span> : null}
          </fieldset>

        <fieldset className="weight">
          <section>
            <label htmlFor="minWeight">
              Peso mínimo: <output>{weight.min} Kg</output>
            </label>
            <input
              type="range"
              name="minWeight"
              min={0}
              max={70}
              value={weight.min}
              onChange={validateMinWeight}
              />
            {weight.min==0 ? <span>Campo obligatorio</span> : null }
          </section>
          <section>
            <label htmlFor="maxWeight">
              Peso máximo: <output>{weight.max} Kg</output>
            </label>
            <input
              type="range"
              name="maxWeight"
              min={0}
              max={100}
              value={weight.max}
              onChange={validateMaxWeight}
              />
              {weight.max == 0 ? <span>Campo obligatorio</span> : null }
            {error.weight ? <span>{error.weight}</span> : null}
          </section>
        </fieldset>
        <fieldset className="height">
          <section>
            <label htmlFor="minHeight">
              Altura mínima: <output>{height.min} cm</output>
            </label>
            <input
              type="range"
              name="minHeight"
              min={0}
              max={200}
              value={height.min}
              onChange={(e) => validateMinHeight(e.target.value)}
              />
              {height.min==0 ? <span>Campo obligatorio</span> : null}
          </section>
          <section>
            <label htmlFor="maxHeight">
              Altura máxima: <output>{height.max} cm</output>
            </label>
            <input
              type="range"
              name="maxHeight"
              min={0}
              max={200}
              value={height.max}
              onChange={(e) => validateMaxHeight(e.target.value)}
            />

              {height.max==0 ? <span>Campo obligatorio</span> : null }
            {error.height ? <span>{error.height}</span> : null}
          </section>
        </fieldset>
        <fieldset className="life_span">
            <div>
          <label >
            Tiempo de vida: <input type="text" name="life_span_min" id="life_span_min" value={lifeSpan.min} onChange={validateLifeSpanMin}/>
          </label> 
             <> a </>
            <input type="text" name="life_span_max" id="life_span_max" value={lifeSpan.max} onChange={validateLifeSpanMax}/>
            <> años</>
            </div>
              {dog.life_span.length<1 ? <span>Campo obligatorio</span> : null }
            {error.life_span ? <span>{error.life_span}</span> : null }
        </fieldset>
        <select
          name="temperamentos"
          id="temps"
          onChange={(e) => handleTemperamentSelect(e.target.value)}
          >
          <option value="">Selecciona su temperamento</option>
          {temperaments &&
            temperaments.map(({ name }) => {
              return <option value={name}>{name}</option>;
            })}
        </select>

        <section className="TempsBox">
            {dog.temperaments.length<1 ? <span>Selecciona al menos 1 temperamento</span> : null }
          {dog.temperaments
            ? dog.temperaments.map((value) => {
                return (
                  <div className="item-temperamento">
                    <p onClick={(e)=>{setDog({...dog, temperaments: dog.temperaments.filter(temp=>temp!==value)})}} >{value}</p>
                  </div>
                );
              })
              : null}
        </section>
        <fieldset className="url" >
          <label htmlFor="urlImage">Url de imagen: </label>
          <input type="text" name="urlImage" id="urlImage" value={dog.image} onChange={validateUrl} />
        {dog.image.length<1 ? <span>Campo obligatorio</span> : null }
          {error.url?<span>{error.url} </span> :null}
        </fieldset>
        

        {validateSubmit() ? (
          <input type="submit" value="Enviar" />
        ) : (
          <input type="submit" value="Enviar" disabled />
          )}
        <input type="reset" value="Restablecer" onClick={handleFormReset} />
      </form>
      <DogID  
      name={dog.name} 
      weight={dog.weight} 
      height={dog.height}
      life_span={dog.life_span}
      temperaments={dog.temperaments}
      image={dog.image}
      />
    </div>
  );
}

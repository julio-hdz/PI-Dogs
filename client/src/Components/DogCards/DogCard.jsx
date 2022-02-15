import React from "react";
import './style.css'
import {useNavigate} from 'react-router-dom'

export default function DogCard({id, name, image, temperaments, weight} ){
    const navigate = useNavigate();
    function handleClick(){
        navigate(`/details/${id}`)
    }

    return(
        <div className="dog-card" id={id} onClick={handleClick}>
            <h3>{name}</h3>
            <img src={image} alt="dogo" />
             {typeof(temperaments)=='string'? <p>{temperaments.split(',').map((v)=>{return v})}</p> :
            <p>{temperaments.map((v)=>{return v.name + ' ' })}</p>} 
            <p> ({weight}) Kg </p>

        </div>
    )
}
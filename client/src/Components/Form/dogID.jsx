import React from "react";
import './form.css'
export default function DogID(props){
    const {name, weight, height, temperaments, life_span, image} = props;
    let stringTemps = '';
    temperaments.forEach((word)=>word == temperaments[0] ? stringTemps = word : stringTemps+= ', '+ word)
    return(
        <div className="ID">
            <section className="frontID">
            <div className="profile">
            {image? <img src={image} alt="" name='profile' /> : null}
            </div>
            <div className="values">

            <p id='name'>{name ? name: '-'}</p>
            <p id='weight'>{weight ? weight : '-'} Kg</p>
            <p id='height'>{height ? height : '-'} cm</p>
            <p id='life_span'>{life_span ? life_span : '-'}</p>
            </div>
            </section>
            <section className="backID">
                {temperaments ? <span>{stringTemps}</span> : null}
            </section>
            
            
        </div>
    )
}
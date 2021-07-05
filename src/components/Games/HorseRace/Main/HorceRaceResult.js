import React from 'react';

const HorceRaceResult = ({tempsTotal})=>{

    return(
        <div>
            {tempsTotal.map((temp,i)=>{
                return <p key={i}>Le coureur {i+1} a termine la course en {temp}s!</p>
            })}
        </div>
    )
}

export default HorceRaceResult;
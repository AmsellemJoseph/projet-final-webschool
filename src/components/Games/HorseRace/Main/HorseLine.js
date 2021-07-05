import React from 'react';
import "./style.css"

const HorseLine = ({temps})=>{

    
    const tempsCourse = {
        temps1:temps[0],
        temps2:temps[1],
        temps3:temps[2],
        temps4:temps[3],
        temps5:temps[4],
    }
    console.log(tempsCourse)
    
    return(
        <div className="main-container-horse-line">
            <div className="line line1">
                <div className="horse" style={{animation: `cheval ${tempsCourse.temps1}s ease-in-out forwards`}}></div>
            </div>
            <div className="line line2">
            <div className="horse" style={{animation: `cheval ${tempsCourse.temps2}s ease-in-out forwards`,animationDelay:`${tempsCourse.temps1}s`}}></div>
            </div>
            <div className="line line3">
            <div className="horse" style={{animation: `cheval ${tempsCourse.temps3}s ease-in-out forwards`,animationDelay:`${tempsCourse.temps1+tempsCourse.temps2}s`}}></div>
            </div>
            <div className="line line4">
            <div className="horse" style={{animation: `cheval ${tempsCourse.temps4}s ease-in-out forwards`,animationDelay:`${tempsCourse.temps1+tempsCourse.temps2+tempsCourse.temps3}s`}}></div>
            </div>
            <div className="line line5">
            <div className="horse" style={{animation: `cheval2 ${tempsCourse.temps5}s ease-in-out forwards`,animationDelay:`${tempsCourse.temps1+tempsCourse.temps2+tempsCourse.temps3+tempsCourse.temps4}s`}}></div>
            </div>
        </div>
    )

}

export default HorseLine
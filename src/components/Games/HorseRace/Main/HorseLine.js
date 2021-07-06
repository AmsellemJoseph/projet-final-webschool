import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./style.css"

const HorseLine = ({temps,color,number})=>{

    
    const tempsCourse = {
        temps1:temps[0],
        temps2:temps[1],
        temps3:temps[2],
        temps4:temps[3],
        temps5:temps[4],
    }

    
    return(
        <div className="main-container-horse-line">
            <div className="line line1">
            <div className="trai"><FontAwesomeIcon icon={['fas','angle-double-right']} style={{position:'absolute',fontSize:'30px',top:'-10px'}}/>&nbsp;&nbsp;<FontAwesomeIcon icon={['fas','angle-double-right']} style={{position:'absolute',fontSize:'30px',top:'-10px'}}/></div>
                <div className="horse" style={{animation: `cheval ${tempsCourse.temps1}s ease-in-out forwards`}}><FontAwesomeIcon style={{color:color}} icon={['fas','space-shuttle']}/></div>
            </div>
            <div className="line line2">
            <div className="trai"><FontAwesomeIcon icon={['fas','angle-double-right']} style={{position:'absolute',fontSize:'30px',top:'-10px'}}/>&nbsp;&nbsp;<FontAwesomeIcon icon={['fas','angle-double-right']} style={{position:'absolute',fontSize:'30px',top:'-10px'}}/></div>
            <div className="horse" style={{animation: `cheval ${tempsCourse.temps2}s ease-in-out forwards`,animationDelay:`${tempsCourse.temps1}s`}}><FontAwesomeIcon style={{color:color}} icon={['fas','space-shuttle']}/></div>
            </div>
            <div className="line line3">
            <div className="trai"><p style={{color:color}}>{number+1}</p></div>
            <div className="horse" style={{animation: `cheval ${tempsCourse.temps3}s ease-in-out forwards`,animationDelay:`${tempsCourse.temps1+tempsCourse.temps2}s`}}><FontAwesomeIcon style={{color:color}} icon={['fas','space-shuttle']}/></div>
            </div>
            <div className="line line4">
            <div className="trai"><FontAwesomeIcon icon={['fas','angle-double-right']} style={{position:'absolute',fontSize:'30px',top:'-10px'}}/>&nbsp;&nbsp;<FontAwesomeIcon icon={['fas','angle-double-right']} style={{position:'absolute',fontSize:'30px',top:'-10px'}}/></div>
            <div className="horse" style={{animation: `cheval ${tempsCourse.temps4}s ease-in-out forwards`,animationDelay:`${tempsCourse.temps1+tempsCourse.temps2+tempsCourse.temps3}s`}}><FontAwesomeIcon style={{color:color}} icon={['fas','space-shuttle']}/></div>
            </div>
            <div className="line line5">
            <div className="trai"><FontAwesomeIcon icon={['fas','angle-double-right']} style={{position:'absolute',fontSize:'30px',top:'-10px'}}/>&nbsp;&nbsp;<FontAwesomeIcon icon={['fas','angle-double-right']} style={{position:'absolute',fontSize:'30px',top:'-10px'}}/></div>
            <div className="horse" style={{animation: `cheval2 ${tempsCourse.temps5}s ease-in-out forwards`,animationDelay:`${tempsCourse.temps1+tempsCourse.temps2+tempsCourse.temps3+tempsCourse.temps4}s`}}><FontAwesomeIcon style={{color:color}} icon={['fas','space-shuttle']}/></div>
            </div>
        </div>
    )

}

export default HorseLine
import React, { useState } from 'react';
import './DayRow.css';
import RegisterRow from '../RegisterRow';
import MorningIcon from '@mui/icons-material/WbSunny';
import AfternoonIcon from '@mui/icons-material/Nightlight';
import TotalIcon from '@mui/icons-material/AllInclusive';

export default ({date, totalHours, totalMorningHours, totalAfternoonHours, dayRegisters, returnData}) => {

    const receiveData = (dataReceived) => {
        returnData(dataReceived);
      }

    return (
        <div className="dayRow">
            <div className="dayRow--header">
                <span className="date">{date}</span>
                <div className="totalHours">
                    <div className="matutinas">
                        <MorningIcon style={{color: "#f7d82a",paddingRight: "10px"}}/>
                        <span>{totalMorningHours}</span>
                    </div>
                    <div className="vespertinas">
                        <AfternoonIcon style={{paddingRight: "10px"}}/>
                        <span>{totalAfternoonHours}</span>
                    </div>
                    <div className="total">
                        <TotalIcon style={{paddingRight: "10px"}}/>
                        <span>{totalHours}</span>
                    </div>
                </div>
            </div>
            <ul className="registerList">
                {dayRegisters.length > 0 && dayRegisters.map((register, key) => (
                    <RegisterRow returnData={receiveData} key={key} description={register.description} startInterval={register.startHour} 
                    endInterval={register.endHour} totalHours={register.totalHours} 
                    totalMorningHours={register.totalMorning} totalAfternoonHours={register.totalAfternoon} date={date}/>
                ))}
            </ul>
        </div>
    );
}
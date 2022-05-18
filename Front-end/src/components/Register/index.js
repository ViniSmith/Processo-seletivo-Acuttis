import React, { useRef } from 'react';
import './Register.css';
import Database from '../../Database';

export default ({receiveData}) => {
    const description = useRef();
    const startHour = useRef();
    const endHour = useRef();
    const error = useRef();
    const date = useRef();

    const verifyDateTime = async () => {
        const startHourDOM = startHour.current;
        const endHourDOM = endHour.current;

        if(description.current.value.trim() === "" || date.current.value === ""
        || startHourDOM.value === "" || endHourDOM.value === ""){
            error.current.innerText = "Erro! Não podem haver campos vazios!"
        }else {
            const startDate = new Date(date.current.value +" " + startHourDOM.value);
            const endDate = new Date(date.current.value +" " + endHourDOM.value);
        
            const now = new Date();

            if(startDate.getTime() >= endDate.getTime()){
                error.current.innerText = "Erro! O horário de início deve ser menor que o final!"
            }else if(endDate.getTime() > now.getTime()){
                error.current.innerText = "Erro! A data não pode ser a partir de hoje!"
            }else {
                const dateFormatted = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`
                const dataList = await Database.postRegister(description.current.value.trim(), startHourDOM.value, endHourDOM.value, dateFormatted);
                receiveData(dataList.data);
                
            }
    
        }
    }

    const verifyHourAllTheTime = (input) => {
        const value = input.value;

        const justNumbers = value.replace(/[^0-9]+/, '');
        input.value = justNumbers;
    
        if(justNumbers){
            input.value = justNumbers.replace(/(\d)(\d{2})$/,"$1:$2")
            if(justNumbers.length === 5){
                input.value = `${justNumbers[0]}${justNumbers[1]}:${justNumbers[2]}${justNumbers[3]}`
            } 
        }
    }

    const verifyHour = (input) => {
        const value = input.value;

        const justNumbers = value.replace(/[^0-9]+/, '');
    
        const hours = +`${justNumbers[0]}${justNumbers[1]}`
        const minutes = +`${justNumbers[2]}${justNumbers[3]}`
    
        if(value[1] === ":"){
            input.value = 0 + value;
        }
    
        if(hours > 23 || hours < 0 || minutes < 0 || minutes > 59){
            if(hours == 24 || (hours === 23 && minutes === 60)){
                input.value = `00:00`
            }
            else if(minutes == 60 && hours < 24){
                input.value = `${hours + 1}:00`
            }else {
                input.value = `08:00`
            }
        }
    }

    return (
        <div className="hoursRegistration">
            <input type="text" name="description" id="description" placeholder="O que foi feito?" ref={description} maxLength="60"/>
            <div className="inputs">
                <input type="text" name="startHour" id="startHour" placeholder="08:00" ref={startHour} 
                onKeyUp={(event) => {verifyHourAllTheTime(event.target)}} onBlur={(event) => {verifyHour(event.target)}}/>

                <input type="text" name="endHour" id="endHour" placeholder="12:00" ref={endHour} 
                onKeyUp={(event) => {verifyHourAllTheTime(event.target)}} onBlur={(event) => {verifyHour(event.target)}}/>
                <input type="date" name="date" id="date" ref={date}/>
            </div>
            <input type="button" value="Registrar" onClick={verifyDateTime} />

            <span className='error' ref={error}></span>
        </div>
    );
}
import './App.css';
import DayRow from './components/DayRow';
import Header from './components/Header';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import Database from './Database';

function App() {
  const [data, setData] = useState([]);

  const loadAll = async () => {
    let dataReturned = await Database.getRegisters();
    setData(dataReturned.employeeHours.data);
  }

  const receiveData = (dataReceived) => {
    setData(dataReceived);
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className='page'>
      <Header />
      <main>
      <Register receiveData={receiveData} />
        <section className='registrations'>
          {data.length > 0 && data.map((item, key) => (
            <DayRow returnData={receiveData} key={key}  date={item.date} totalHours= {item.totalHours} 
            totalMorningHours={item.totalMorning} totalAfternoonHours={item.totalAfternoon} dayRegisters={item.dayWorked} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;

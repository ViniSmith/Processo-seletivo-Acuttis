const HourRegister = require('./HourRegister');

class DayRegister {
  constructor(id, date, dayWorked) {
    this.id = id;
    this.date = date;
    this.dayWorked = dayWorked;
    this.totalHours = this._totalHoursFunction();
    this.totalMorning = this._totalMorningFunction();
    this.totalAfternoon = this._totalAfternoonFunction();
  }
  _totalHoursFunction() {
    let totalHoursOfTheDay = [0,0];
    this.dayWorked.forEach((element) => {
      const time = element.totalHours.split(':');
      let minutes = +time[1];
      const hours = +(time[0]);
      totalHoursOfTheDay[1] += minutes;
      totalHoursOfTheDay[0] += hours;
    });

    if (totalHoursOfTheDay[1] > 59) {
      totalHoursOfTheDay[0] += Math.floor(totalHoursOfTheDay[1] / 59);
      totalHoursOfTheDay[1] = totalHoursOfTheDay[1] % 60;
    }

    if(totalHoursOfTheDay[0] < 10){
      totalHoursOfTheDay[0] = "0" + totalHoursOfTheDay[0]
    }

    if(totalHoursOfTheDay[1] < 10){
      totalHoursOfTheDay[1] = "0" + totalHoursOfTheDay[1]
    }
    console.log("hours", totalHoursOfTheDay)
    this.totalHours = `${totalHoursOfTheDay[0]}:${totalHoursOfTheDay[1]}`;
  }

  _totalMorningFunction() {
    let totalHoursOfTheDay = [0,0];
    this.dayWorked.forEach((element) => {
      const time = element.totalMorning.split(':');
      let minutes = +time[1];
      const hours = +(time[0]);
      totalHoursOfTheDay[1] += minutes;
      totalHoursOfTheDay[0] += hours;
    });

    
    if (totalHoursOfTheDay[1] > 59) {
      totalHoursOfTheDay[0] += Math.floor(totalHoursOfTheDay[1] / 59);
      totalHoursOfTheDay[1] = totalHoursOfTheDay[1] % 60;
    }

    if(totalHoursOfTheDay[0] < 10){
      totalHoursOfTheDay[0] = "0" + totalHoursOfTheDay[0]
    }

    if(totalHoursOfTheDay[1] < 10){
      totalHoursOfTheDay[1] = "0" + totalHoursOfTheDay[1]
    }
    console.log("mo", totalHoursOfTheDay)
    this.totalMorning = `${totalHoursOfTheDay[0]}:${totalHoursOfTheDay[1]}`;
  }

  _totalAfternoonFunction() {
    let totalHoursOfTheDay = [0,0];
    this.dayWorked.forEach((element) => {
      const time = element.totalAfternoon.split(':');
      let minutes = +time[1];
      const hours = +(time[0]);
      totalHoursOfTheDay[1] += minutes;
      totalHoursOfTheDay[0] += hours;
    });

    console.log("after122221", totalHoursOfTheDay)
    
    if (totalHoursOfTheDay[1] > 59) {
      console.log("after2222122221", totalHoursOfTheDay)
      totalHoursOfTheDay[0] += Math.floor(totalHoursOfTheDay[1] / 59);
      console.log("after132422221", totalHoursOfTheDay)
      totalHoursOfTheDay[1] = totalHoursOfTheDay[1] % 60;
    }

    console.log("after", totalHoursOfTheDay)

    if(totalHoursOfTheDay[0] < 10){
      totalHoursOfTheDay[0] = "0" + totalHoursOfTheDay[0]
    }

    if(totalHoursOfTheDay[1] < 10){
      totalHoursOfTheDay[1] = "0" + totalHoursOfTheDay[1]
    }
    console.log("after", totalHoursOfTheDay)
    this.totalAfternoon = `${totalHoursOfTheDay[0]}:${totalHoursOfTheDay[1]}`;
  }
}

// const novaHora = new HourRegister("alalas", "11:30", "16:40", 5456231);
// const novaHora2 = new HourRegister("alalaska", "10:30", "17:40", 2313215);
// const dia = [];
// dia[0] = novaHora;
// dia[1] = novaHora2;

// const dias = new DayRegister(214, 23-10-2010, dia);
// console.log(dias._totalHours);

module.exports = DayRegister;

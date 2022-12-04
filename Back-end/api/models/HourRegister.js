class HourRegister {
  constructor(description, startHour, endHour, id){
    this.description = description;
    this.startHour = startHour;
    this.endHour = endHour;
    this.id = id;
    this.totalHours;
    this.totalMorning;
    this.totalAfternoon;
  }
  _totalHoursFunction() {
    const hoursAfternoon = this.totalAfternoon.split(':');
    const hoursMorning = this.totalMorning.split(':');
    let totalHours = 0;
    let totalMinutes = 0;
    console.log(hoursAfternoon, "horas afternoon");
    console.log(hoursMorning, "horas morning");

    if((+hoursAfternoon[1] + +hoursMorning[1]) > 59) {
      totalMinutes = (+hoursAfternoon[1] + +hoursMorning[1]) - 59;
      totalHours =+ 1;
    }

    totalMinutes = (+hoursAfternoon[1] + +hoursMorning[1]);
    totalHours += (+hoursAfternoon[0] + +hoursMorning[0]);
    if(totalMinutes < 10) {
      totalMinutes = "0"+totalMinutes;
    }
    this.totalHours = `${totalHours}:${totalMinutes}`;
  }
  _totalAfternoonFunction() {
    const startAfternoon = this.startHour.substr(0, 2) >= 12 ? new Date("2001-12-01 " + this.startHour) :  new Date("2001-12-01 12:00");
    console.log(this.startHour.substr(0, 2), "START")
    const endHour = new Date("2001-12-01 " + this.endHour);

    if(endHour.getTime() > startAfternoon.getTime()) {
      const timestampDiff = endHour.getTime() - startAfternoon.getTime();
      const hours = this._hours(timestampDiff);
      let minutes = this._minutes(timestampDiff);
      console.log(`afternoon${hours}:${minutes}`);

      if(minutes < 10 && minutes.lenght != "00") {
        minutes = "0"+minutes;
      }

      this.totalAfternoon = `${hours}:${minutes}`;
      
    }else {
      this.totalAfternoon = "00:00";
    }
  }

  _totalMorningFunction() {
    const endMorning = new Date("2001-12-01 12:00");
    const startHour = new Date("2001-12-01 " + this.startHour);
    if(startHour.getTime() <= endMorning.getTime()) {
      const timestampDiff = endMorning.getTime() - startHour.getTime();
      const hours = this._hours(timestampDiff);
      let minutes = this._minutes(timestampDiff);
      console.log(`mor${hours}:${minutes}`);
      if(minutes < 10 && minutes.lenght != "00") {
        minutes = "0"+minutes;
      }
      this.totalMorning = `${hours}:${minutes}`;
    }else{
      this.totalMorning = "00:00";
    }
  }

  _hours(timestamp){
    return Math.floor(timestamp / (60*60*1000));
  }

  _minutes(timestamp){
    const hours = timestamp%(60*60*1000)
    return Math.floor(hours/(60*1000));
  }

}

  //TESTE DE FUNCIONAMENTO
const endHour = new HourRegister("adssadasd", "06:45", "23:59", '24 December 2018');
console.log(endHour._totalHours);

module.exports = HourRegister;
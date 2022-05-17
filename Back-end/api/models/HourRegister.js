class HourRegister {
  constructor(description, startHour, endHour, date, id){
    this.description = description;
    this.startHour = startHour;
    this.endHour = endHour;
    this.date = date;
    this.id = id;
  }
  get _totalHours() {
    const hoursAfternoon =  this._totalAfternoon.split(':');
    const hoursMorning = this._totalMorning.split(':');
    let totalHours = 0;
    let totalMinutes = 0;

    if(hoursAfternoon[1] + hoursMorning[1] > 59) {
      totalMinutes = (+hoursAfternoon[1] + +hoursMorning[1]) - 59;
      totalHours ++;
    }
    totalHours += (+hoursAfternoon[0] + +hoursMorning[0]);
    if(totalMinutes < 10) {
      totalMinutes = "0"+totalMinutes;
    }
    return `${totalHours}:${totalMinutes}`;
  }
  get _totalAfternoon() {
    const startAfternoon = new Date(this.date + " 12:00");
    const endHour = new Date(this.date + " " + this.endHour);
    if(endHour.getTime() > startAfternoon.getTime()) {
      const timestampDiff = endHour.getTime() - startAfternoon.getTime();
      const hours = this._hours(timestampDiff);
      const minutes = this._minutes(timestampDiff);
      return `${hours}:${minutes}`;
    }else {
      return "00:00";
    }
  }

  get _totalMorning() {
    const endMorning = new Date(this.date + " 11:59");
    const startHour = new Date(this.date + " " + this.startHour);
    if(startHour.getTime() < endMorning.getTime()) {
      const timestampDiff = endMorning.getTime() - startHour.getTime();
      const hours = this._hours(timestampDiff);
      const minutes = this._minutes(timestampDiff);
      return `${hours}:${minutes}`;
    }else{
      return "00:00";
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
// const endHour = new HourRegister("adssadasd", "06:45", "23:59", '24 December 2018');
// console.log(endHour._totalHours);


class DayRegister{
  constructor(id, date, dayWorked) {
    this.id = id;
    this.date = date;
    this.dayWorked = dayWorked;
  }
  get _totalHours() {
    this.dayWorked.forEach(element => {
      let totalHoursOfTheDay = 0;
      totalHoursOfTheDay = this.element._totalHours;
      return totalHoursOfTheDay;
    });
  }
}

module.exports = DayRegister;
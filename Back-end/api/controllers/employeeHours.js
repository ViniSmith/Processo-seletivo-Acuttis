const uuidv4 = require('uuid/v4');
module.exports = app => {
  const employeeHoursDB = app.data.employeeHours;
  const controller = {};

  const {
    employeeHours: employeeHoursMock,
  } = employeeHoursDB;
  
  controller.listEmployeeHours = (req, res) => res.status(200).json(employeeHoursDB);

  controller.saveEmployeeHours = (req, res) => {
    console.log(req.body);
    employeeHoursMock.data.push({
      description: req.body.description,
      startHour: req.body.startHour,
      endHour: req.body.endHour,
      date: req.body.date,
    });

    res.status(201).json(employeeHoursMock);
  }

  return controller;
}
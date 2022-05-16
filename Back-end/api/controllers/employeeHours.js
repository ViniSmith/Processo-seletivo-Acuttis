module.exports = () => {
  const employeeHoursDB = require('../data/employeeHours.json');
  const controller = {};

  controller.listEmployeeHours = (req, res) => res.status(200).json(employeeHoursDB);

  return controller;
}
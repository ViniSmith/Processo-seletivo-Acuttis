const HourRegister = require('../models/HourRegister');
const DayRegister = require('../models/DayRegister');
const uuidv4 = require('uuid/v4');

module.exports = (app) => {
  const employeeHoursDB = app.data.employeeHours;
  const controller = {};

  const { employeeHours: employeeHoursMock } = employeeHoursDB;

  controller.listEmployeeHours = (req, res) =>
    res.status(200).json(employeeHoursDB);

  controller.saveEmployeeHours = (req, res) => {
    const register = new HourRegister(
      req.body.description,
      req.body.startHour,
      req.body.endHour,
      uuidv4(),
    );
      register._totalAfternoonFunction();
      register._totalMorningFunction();
      register._totalHoursFunction();
    let registerInDB = null;
    let indexRegister;
    employeeHoursMock.data.forEach((item, index) => {
      if (item.date === req.body.date) {
        registerInDB = item;
        indexRegister = index;
      }
    });

    if (registerInDB !== null) {
      registerInDB.dayWorked.push(register);
      registerInDB._totalHoursFunction();
      registerInDB._totalMorningFunction();
      registerInDB._totalAfternoonFunction();
      employeeHoursMock.data.splice(indexRegister, 1, registerInDB);
    } else {
      const arrayRegister = [register];
      const registerDay = new DayRegister(
        uuidv4(),
        req.body.date,
        arrayRegister,
      );

      registerDay._totalHoursFunction();
      registerDay._totalMorningFunction();
      registerDay._totalAfternoonFunction();
      console.log(registerDay);
      employeeHoursMock.data.push(registerDay);
    }

    res.status(201).json(employeeHoursMock);
  };

  controller.removeEmployeeHours = (req, res) => {
    const { registerId } = req.params;
    console.log("qualqeurcoisa ", registerId);

    let dayRegister = null;
    let hourRegisterIndex = 0;
    let hourRegister = null;
    let dayRegisterIndex = 0;
    employeeHoursMock.data.forEach((item, index) => {
      item.dayWorked.forEach((hourItem, hourIndex) => {
        if (hourItem.id === registerId) {
          dayRegister = item;
          dayRegisterIndex = index;
          hourRegister = hourItem;
          hourRegisterIndex = hourIndex;
        }
      });
    });

    if (hourRegister == null) {
      res.status(404).json({
        message: 'Horário não encontrado na base.',
        sucess: false,
        employeeHours: employeeHoursMock,
      });
    } else {
      dayRegister.dayWorked.splice(hourRegisterIndex, 1);
      if (dayRegister.dayWorked.length === 0) {
        employeeHoursMock.data.splice(dayRegisterIndex, 1);
      } else {
        employeeHoursMock.data.splice(dayRegisterIndex, 1, dayRegister);
      }
      dayRegister._totalHoursFunction();
      dayRegister._totalMorningFunction();
      dayRegister._totalAfternoonFunction();

      res.status(200).json({
        message: 'Horário encontrado e deletado com suesso',
        sucess: true,
        employeeHours: employeeHoursMock,
      });
    }
  };

  controller.updateEmployeeHours = (req, res) => {
    const { registerId } = req.params;
    console.log("updateporra", registerId);
    console.log(res.body);

    const newRegister = new HourRegister(
      req.body.description,
      req.body.startHour,
      req.body.endHour,
      registerId,
    );

    let dayRegister = null;
    let hourRegister = null;
    let dayRegisterIndex = 0;
    let hourRegisterIndex = 0;

    employeeHoursMock.data.forEach((item, index) => {
      item.dayWorked.forEach((hourItem, hourIndex) => {
        if (hourItem.id === registerId) {
          dayRegister = item;
          dayRegisterIndex = index;
          hourRegister = hourItem;
          hourRegisterIndex = hourIndex;
        }
      });
    });

    if (hourRegister == null) {
      res.status(404).json({
        message: 'Horário não encontrado na base.',
        sucess: false,
        employeeHours: employeeHoursMock,
      });
    } else {
      dayRegister.dayWorked.splice(hourRegisterIndex, 1);
      dayRegister._totalHoursFunction();
      dayRegister._totalMorningFunction();
      dayRegister._totalAfternoonFunction();
      if (dayRegister.dayWorked.length === 0) {
        employeeHoursMock.data.splice(dayRegisterIndex, 1);
      } else {
        employeeHoursMock.data.splice(dayRegisterIndex, 1, dayRegister);
      }

      let registerInDB = null;
      let indexRegisterInDB = 0;
      employeeHoursMock.data.forEach((item, index) => {
        if (item.date === req.body.date) {
          registerInDB = item;
          indexRegisterInDB = index;
        }
      });

      if (registerInDB !== null) {
        registerInDB.dayWorked.push(newRegister);
        registerInDB._totalHoursFunction();
        registerInDB._totalMorningFunction();
        registerInDB._totalAfternoonFunction();
        employeeHoursMock.data.splice(indexRegisterInDB, 1, registerInDB);
      } else {
        const arrayRegister = [newRegister];
        const registerDay = new DayRegister(
          uuidv4(),
          req.body.date,
          arrayRegister,
        );

        registerDay._totalHoursFunction();
        registerDay._totalMorningFunction();
        registerDay._totalAfternoonFunction();
        
        employeeHoursMock.data.push(registerDay);
      }

      // function organize(a, b) {
      //   return a.date < b.date;
      // }

      // employeeHoursDB.data.sort(organize);
      // console.log(employeeHoursDB);

      res.status(200).json({
        message: 'Hora encontrada e atualizada com sucesso!',
        sucess: true,
        employeeHours: employeeHoursMock,
      });
    }
  };

  return controller;
};

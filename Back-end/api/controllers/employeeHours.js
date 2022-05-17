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
      id: uuidv4(),
      description: req.body.description,
      startHour: req.body.startHour,
      endHour: req.body.endHour,
      date: req.body.date,
    });

    res.status(201).json(employeeHoursMock);
  }

  controller.removeEmployeeHours = (req,res) => {
    const {
      registerId,
    } = req.params;

    const foundEmployeeHoursIndex = employeeHoursMock.data.findIndex(employee => employee.id == registerId);

    if(foundEmployeeHoursIndex == -1) {
      res.status(404).json({
        message: 'Horário não encontrado na base.',
        sucess: false,
        employeeHours: employeeHoursMock,
      });
    }else {
      employeeHoursMock.data.splice(foundEmployeeHoursIndex, 1);
      res.status(200).json({
        message: 'Horário encontrado e deletado com suesso',
        sucess: true,
        employeeHours: employeeHoursMock,
      });
    }
  };

  controller.updateEmployeeHours = (req, res) => {
    const {
      registerId,
    } = req.params;
    const foundEmployeeHoursIndex = employeeHoursMock.data.findIndex(employee => employee.id == registerId);

    if(foundEmployeeHoursIndex == -1) {
      res.status(404).json({
        message: 'Hora não encontrada na base.',
        sucess: false,
        emplooyeHours: employeeHoursMock,
      });
    }else {
      const newEmployeeHours = {
        id: registerId,
        description: req.body.description,
        startHour: req.body.startHour,
        endHour: req.body.endHour,
        date: req.body.date,
        createdAt: new Date()
      };

      employeeHoursMock.data.splice(foundEmployeeHoursIndex, 1, newEmployeeHours);

      res.status(200).json({
        message: 'Hora encontrada e atualizada com sucesso!',
        sucess: true,
        employeeHours: employeeHoursMock,
      });
    }
  }
  
  return controller;
}
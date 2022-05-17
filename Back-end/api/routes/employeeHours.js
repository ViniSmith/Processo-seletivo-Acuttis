module.exports = app => {
  const controller = app.controllers.employeeHours;

  app.route('/api/v1/employee-hours')
    .get(controller.listEmployeeHours);

  app.route('/api/v1/new-employee-hours')
  .post(controller.saveEmployeeHours);

  app.route('/api/v1/remove-employee-hours/:registerId')
  .delete(controller.removeEmployeeHours)
  
  app.route('/api/v1/employee-hours/:registerId')
  .put(controller.updateEmployeeHours);
}

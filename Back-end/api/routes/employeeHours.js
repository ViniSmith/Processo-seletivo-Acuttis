module.exports = app => {
  const controller = require('../controllers/employeeHours')();

  app.route('/api/v1/customer-wallets')
    .get(controller.listEmployeeHours);
}
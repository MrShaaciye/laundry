`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const SMSEmployeeCtrl = require(`../controllers/SMSemployee.controller.jsx`);

  // SMS Employee Routers
  router.route(`/SMSemployee`).post(SMSEmployeeCtrl.create).get(SMSEmployeeCtrl.findAll);
  router.route(`/SMSemployee/:id`).get(SMSEmployeeCtrl.findOne).put(SMSEmployeeCtrl.update).delete(SMSEmployeeCtrl.delete);
  router.route(`/SMSemployee/restore/:id`).get(SMSEmployeeCtrl.restore);

  app.use(`/api/v1`, router);
};

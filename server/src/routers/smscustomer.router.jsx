`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const SMSCustomerCtrl = require(`../controllers/SMScustomer.controller.jsx`);

  // SMS Customer Routers
  router.route(`/SMScustomer`).post(token, SMSCustomerCtrl.create).get(token, SMSCustomerCtrl.findAll);
  router.route(`/SMScustomer/:id`).get(token, SMSCustomerCtrl.findOne).put(token, SMSCustomerCtrl.update).delete(token, SMSCustomerCtrl.delete);
  router.route(`/SMScustomer/restore/:id`).get(SMSCustomerCtrl.restore);

  app.use(`/api/v1`, router);
};

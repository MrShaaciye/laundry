`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const paymentCtrl = require(`../controllers/payment.controller.jsx`);

  // Payment Routers
  router.route(`/payment`).post(paymentCtrl.create).get(paymentCtrl.findAll);
  router.route(`/payment/:id`).get(paymentCtrl.findOne).put(paymentCtrl.update).delete(paymentCtrl.delete);
  router.route(`/payment/restore/:id`).get(paymentCtrl.restore);

  app.use(`/api/v1`, router);
};

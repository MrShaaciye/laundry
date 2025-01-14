`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const paymentCtrl = require(`../controllers/payment.controller.jsx`);

  // Payment Routers
  router.route(`/payment`).post(token, paymentCtrl.create).get(token, paymentCtrl.findAll);
  router.route(`/payment/:id`).get(token, paymentCtrl.findOne).put(token, paymentCtrl.update).delete(token, paymentCtrl.delete);
  router.route(`/payment/restore/:id`).get(paymentCtrl.restore);

  app.use(`/api/v1`, router);
};

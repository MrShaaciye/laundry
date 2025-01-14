`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const deliveryCtrl = require(`../controllers/delivery.controller.jsx`);

  // Delivery Routers
  router.route(`/delivery`).post(token, deliveryCtrl.create).get(token, deliveryCtrl.findAll);
  router.route(`/delivery/:id`).get(token, deliveryCtrl.findOne).put(token, deliveryCtrl.update).delete(token, deliveryCtrl.delete);
  router.route(`/delivery/restore/:id`).get(deliveryCtrl.restore);

  app.use(`/api/v1`, router);
};

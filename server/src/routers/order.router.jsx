`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const orderCtrl = require(`../controllers/order.controller.jsx`);

  // Order Routers
  router.route(`/order`).post(token, orderCtrl.create).get(token, orderCtrl.findAll);
  router.route(`/order/:id`).get(token, orderCtrl.findOne).put(token, orderCtrl.update).delete(token, orderCtrl.delete);
  router.route(`/order/restore/:id`).get(orderCtrl.restore);

  app.use(`/api/v1`, router);
};

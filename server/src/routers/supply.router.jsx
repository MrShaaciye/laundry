`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const supplyCtrl = require(`../controllers/supply.controller.jsx`);

  // Supply Routers
  router.route(`/supply`).post(token, supplyCtrl.create).get(token, supplyCtrl.findAll);
  router.route(`/supply/:id`).get(token, supplyCtrl.findOne).put(token, supplyCtrl.update).delete(token, supplyCtrl.delete);
  router.route(`/supply/restore/:id`).get(supplyCtrl.restore);

  app.use(`/api/v1`, router);
};

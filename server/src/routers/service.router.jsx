`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const serviceCtrl = require(`../controllers/service.controller.jsx`);

  // Service Routers
  router.route(`/service`).post(token, serviceCtrl.create).get(token, serviceCtrl.findAll);
  router.route(`/service/:id`).get(token, serviceCtrl.findOne).put(token, serviceCtrl.update).delete(token, serviceCtrl.delete);
  router.route(`/service/restore/:id`).get(serviceCtrl.restore);

  app.use(`/api/v1`, router);
};

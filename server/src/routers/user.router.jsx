`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require("../middleware/auth.jsx");

  // Import Controllers
  const userCtrl = require(`../controllers/user.controller.jsx`);

  // User Routers
  router.route(`/auth`).get(token, userCtrl.auth);
  router.route(`/user`).post(userCtrl.create).get(userCtrl.findAll);
  router.route(`/user/:id`).get(userCtrl.findOne).put(userCtrl.update).delete(userCtrl.delete);
  router.route(`/user/restore/:id`).get(userCtrl.restore);
  router.route(`/user/login`).post(userCtrl.login);

  app.use(`/api/v1`, router);
};

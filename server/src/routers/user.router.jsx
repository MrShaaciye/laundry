`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require("../middleware/auth.jsx");

  // Import Controllers
  const userCtrl = require(`../controllers/user.controller.jsx`);

  // User Routers
  router.route(`/auth`).get(token, userCtrl.auth);
  router.route(`/user`).post(token, userCtrl.create).get(token, userCtrl.findAll);
  router.route(`/user/:id`).get(token, userCtrl.findOne).put(token, userCtrl.update).delete(token, userCtrl.delete);
  router.route(`/user/restore/:id`).get(token, userCtrl.restore);
  router.route(`/user/login`).post(userCtrl.login);

  app.use(`/api/v1`, router);
};

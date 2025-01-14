`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const itemCtrl = require(`../controllers/item.controller.jsx`);

  // Item Routers
  router.route(`/item`).post(token, itemCtrl.create).get(token, itemCtrl.findAll);
  router.route(`/item/:id`).get(token, itemCtrl.findOne).put(token, itemCtrl.update).delete(token, itemCtrl.delete);
  router.route(`/item/restore/:id`).get(itemCtrl.restore);

  app.use(`/api/v1`, router);
};

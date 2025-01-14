`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const inventoryCtrl = require(`../controllers/inventory.controller.jsx`);

  // Inventory Routers
  router.route(`/inventory`).post(inventoryCtrl.create).get(inventoryCtrl.findAll);
  router.route(`/inventory/:id`).get(inventoryCtrl.findOne).put(inventoryCtrl.update).delete(inventoryCtrl.delete);
  router.route(`/inventory/restore/:id`).get(inventoryCtrl.restore);

  app.use(`/api/v1`, router);
};

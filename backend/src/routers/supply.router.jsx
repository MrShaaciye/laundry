`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();
    const token = require(`../middleware/auth.jsx`);

    // Import Controllers
    const supplyCtrl = require(`../controllers/supply.controller.jsx`);

    // Supply Routers
    router.route(`/supply`).post(supplyCtrl.create).get(supplyCtrl.findAll);
    router.route(`/supply/:id`).get(supplyCtrl.findOne).put(supplyCtrl.update).delete(supplyCtrl.delete);
    router.route(`/supply/restore/:id`).get(supplyCtrl.restore);

    app.use(`/api/v1`, router);
};

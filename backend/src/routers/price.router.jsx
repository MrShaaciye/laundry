`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();
    const token = require(`../middleware/auth.jsx`);

    // Import Controllers
    const priceCtrl = require(`../controllers/price.controller.jsx`);

    // Price Routers
    router.route(`/price`).post(priceCtrl.create).get(priceCtrl.findAll);
    router.route(`/price/:id`).get(priceCtrl.findOne).put(priceCtrl.update).delete(priceCtrl.delete);
    router.route(`/price/restore/:id`).get(priceCtrl.restore);

    app.use(`/api/v1`, router);
};

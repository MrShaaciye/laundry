`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();

    // Import Controllers
    const orderCtrl = require(`../controllers/order.controller.jsx`);

    // Order Routers
    router.route(`/order`).post(orderCtrl.create).get(orderCtrl.findAll);
    router.route(`/order/:id`).get(orderCtrl.findOne).put(orderCtrl.update).delete(orderCtrl.delete);
    router.route(`/order/restore/:id`).get(orderCtrl.restore);

    app.use(`/api/v1`, router);
};

`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();
    const token = require(`../middleware/auth.jsx`);

    // Import Controllers
    const serviceCtrl = require(`../controllers/service.controller.jsx`);

    // Service Routers
    router.route(`/service`).post(serviceCtrl.create).get(serviceCtrl.findAll);
    router.route(`/service/:id`).get(serviceCtrl.findOne).put(serviceCtrl.update).delete(serviceCtrl.delete);
    router.route(`/service/restore/:id`).get(serviceCtrl.restore);

    app.use(`/api/v1`, router);
};

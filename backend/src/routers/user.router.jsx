`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();

    // Import Controllers
    const userCtrl = require(`../controllers/user.controller.jsx`);

    // User Routers
    router.route(`/user`).post(userCtrl.create).get(userCtrl.findAll);
    router.route(`/user/:id`).get(userCtrl.findOne).put(userCtrl.update).delete(userCtrl.delete);
    router.route(`/user/restore/:id`).get(userCtrl.restore);

    app.use(`/api/v1`, router);
};

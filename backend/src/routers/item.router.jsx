`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();
    const token = require(`../middleware/auth.jsx`);

    // Import Controllers
    const itemCtrl = require(`../controllers/item.controller.jsx`);

    // Item Routers
    router.route(`/item`).post(itemCtrl.create).get(itemCtrl.findAll);
    router.route(`/item/:id`).get(itemCtrl.findOne).put(itemCtrl.update).delete(itemCtrl.delete);
    router.route(`/item/restore/:id`).get(itemCtrl.restore);

    app.use(`/api/v1`, router);
};

`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();

    // Import Controllers
    const smsEmployeeCtrl = require(`../controllers/smsemployee.controller.jsx`);

    // SMS Employee Routers
    router.route(`/smsemployee`).post(smsEmployeeCtrl.create).get(smsEmployeeCtrl.findAll);
    router.route(`/smsemployee/:id`).get(smsEmployeeCtrl.findOne).put(smsEmployeeCtrl.update).delete(smsEmployeeCtrl.delete);
    router.route(`/smsemployee/restore/:id`).get(smsEmployeeCtrl.restore);

    app.use(`/api/v1`, router);
};

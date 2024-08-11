`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();

    // Import Controllers
    const smsCustomerCtrl = require(`../controllers/smscustomer.controller.jsx`);

    // SMS Customer Routers
    router.route(`/smscustomer`).post(smsCustomerCtrl.create).get(smsCustomerCtrl.findAll);
    router.route(`/smscustomer/:id`).get(smsCustomerCtrl.findOne).put(smsCustomerCtrl.update).delete(smsCustomerCtrl.delete);
    router.route(`/smscustomer/restore/:id`).get(smsCustomerCtrl.restore);

    app.use(`/api/v1`, router);
};

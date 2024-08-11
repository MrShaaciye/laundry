`use strict`;
module.exports = app => {
    // Import router from express, middleware & multer
    const router = require(`express`).Router();
    const token = require(`../middleware/auth.jsx`);
    const multer = require(`multer`);

    // Import Controllers
    const customerCtrl = require(`../controllers/customer.controller.jsx`);

    // Set up multer for file upload
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    // Customer Routers
    router.route(`/customer/bulkCreate`).post(upload.single(`file`), customerCtrl.bulkCreate);
    router.route(`/customer`).post(customerCtrl.create).get(customerCtrl.findAll);
    router.route(`/customer/:id`).get(customerCtrl.findOne).put(customerCtrl.update).delete(customerCtrl.delete);
    router.route(`/customer/restore/:id`).get(customerCtrl.restore);

    app.use(`/api/v1`, router);
};

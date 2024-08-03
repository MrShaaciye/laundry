`use strict`;
module.exports = app => {
    // Import router from express & middleware
    const router = require(`express`).Router();

    // Import Controllers
    const expenseCtrl = require(`../controllers/expense.controller.jsx`);

    // Expense Routers
    router.route(`/expense`).post(expenseCtrl.create).get(expenseCtrl.findAll);
    router.route(`/expense/:id`).get(expenseCtrl.findOne).put(expenseCtrl.update).delete(expenseCtrl.delete);
    router.route(`/expense/restore/:id`).get(expenseCtrl.restore);

    app.use(`/api/v1`, router);
};

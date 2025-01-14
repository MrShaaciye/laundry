`use strict`;
module.exports = (app) => {
  // Import router from express & middleware
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);

  // Import Controllers
  const expenseCtrl = require(`../controllers/expense.controller.jsx`);

  // Expense Routers
  router.route(`/expense`).post(token, expenseCtrl.create).get(token, expenseCtrl.findAll);
  router.route(`/expense/:id`).get(token, expenseCtrl.findOne).put(token, expenseCtrl.update).delete(token, expenseCtrl.delete);
  router.route(`/expense/restore/:id`).get(expenseCtrl.restore);

  app.use(`/api/v1`, router);
};

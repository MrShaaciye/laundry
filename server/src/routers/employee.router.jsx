`use strict`;
module.exports = (app) => {
  // Import router from express, middleware & multer
  const router = require(`express`).Router();
  const token = require(`../middleware/auth.jsx`);
  const multer = require(`multer`);

  // Import Controllers
  const employeeCtrl = require(`../controllers/employee.controller.jsx`);

  // Set up multer for file upload
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // Employee Routers
  router.route(`/employee/bulkCreate`).post(upload.single(`file`), employeeCtrl.bulkCreate);
  router.route(`/employee`).post(token, employeeCtrl.create).get(token, employeeCtrl.findAll);
  router.route(`/employee/:id`).get(token, employeeCtrl.findOne).put(token, employeeCtrl.update).delete(token, employeeCtrl.delete);
  router.route(`/employee/restore/:id`).get(employeeCtrl.restore);

  app.use(`/api/v1`, router);
};

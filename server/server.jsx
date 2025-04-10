`use strict`;
require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require(`express`);
const cors = require(`cors`);
const https = require(`https`);

const corsOptions = require(`./src/middleware/corsOptions.jsx`);
const compressionOptions = require(`./src/middleware/compressionOptions.jsx`);
const logger = require(`./src/middleware/logger.jsx`);
const httpsServer = require(`./src/middleware/httpsServer.jsx`);

// CONFIGURATION
const app = express();

// Middlewares
app
  .use(cors(corsOptions))
  .use(compressionOptions)
  .use(logger)
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .get(`/`, (req, res) => res.send({ message: `Welcome to Laundry Management System` }));

// ROUTERS
require(`./src/routers/customer.router.jsx`)(app);
require(`./src/routers/employee.router.jsx`)(app);
require(`./src/routers/service.router.jsx`)(app);
require(`./src/routers/item.router.jsx`)(app);
require(`./src/routers/price.router.jsx`)(app);
require(`./src/routers/supply.router.jsx`)(app);
require(`./src/routers/order.router.jsx`)(app);
require(`./src/routers/expense.router.jsx`)(app);
require(`./src/routers/payment.router.jsx`)(app);
require(`./src/routers/inventory.router.jsx`)(app);
require(`./src/routers/delivery.router.jsx`)(app);
require(`./src/routers/user.router.jsx`)(app);
require(`./src/routers/SMScustomer.router.jsx`)(app);
require(`./src/routers/SMSemployee.router.jsx`)(app);

// Server
app.get(`*`, (req, res) => res.status(404).json({ message: `Sorry! This route doesn't exist` }));
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// https.createServer(httpsServer, app).listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

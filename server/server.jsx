`use strict`;
const express = require(`express`);
const dotenv = require(`dotenv`).config();
const cors = require(`cors`);
const https = require(`https`);
const fs = require(`fs`);
const corsOptions = require(`./src/middleware/corsOptions.jsx`);
const compressionOpt = require(`./src/middleware/compressionOpt.jsx`);
const logger = require(`./src/middleware/logger.jsx`);

// CONFIGURATION
const app = express();
const httpsServer = https.createServer({
  key: fs.readFileSync(`./src/keys/key.pem`),
  cert: fs.readFileSync(`./src/keys/cert.pem`),
});

// Middlewares
app
  .use(cors(corsOptions))
  .use(compressionOpt)
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
require(`./src/routers/smscustomer.router.jsx`)(app);
require(`./src/routers/smsemployee.router.jsx`)(app);

app.get(`*`, (req, res) => res.status(404).send({ message: `Sorry! This route doesn't exist` }));
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// https.createServer(httpsServer, app).listen(PORT, () => console.log(`Server listening on port ${PORT}`));

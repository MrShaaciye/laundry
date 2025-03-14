`use strict`;
const moment = require("moment");

// Create Logger
const logger = (req, res, next) => (console.log(`${req.protocol}://${req.get("host")}${req.originalUrl} - ${moment().format("LLLL")}`), next());

module.exports = logger;

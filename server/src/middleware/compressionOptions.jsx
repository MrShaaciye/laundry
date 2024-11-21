`use strict`;
const compression = require("compression");

const compressionOptions = compression({
  level: 6,
  threshold: 10 * 1000,
  filter: (req, res) => {
    if (req.headers[`x-no-compression`]) {
      return false;
    }
    return compression.filter(req, res);
  },
});

module.exports = compressionOptions;

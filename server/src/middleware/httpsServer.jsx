const https = require(`https`);
const fs = require(`fs`);

const httpsServer = https.createServer({
  key: fs.readFileSync(`./src/keys/key.pem`),
  cert: fs.readFileSync(`./src/keys/cert.pem`),
});

module.exports = httpsServer;

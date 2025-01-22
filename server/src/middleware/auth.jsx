`use strict`;
const jwt = require(`jsonwebtoken`);

const token = (req, res, next) => {
  const accessToken = req.header(`accessToken`);
  !accessToken ? res.json({ err: `User not logged in!` }) : accessToken;

  try {
    const validToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = validToken;

    return validToken ? next() : !validToken;
  } catch (err) {
    return res.json({ err: err });
  }
};

module.exports = token;

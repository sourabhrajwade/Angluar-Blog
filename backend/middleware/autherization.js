const jwt = require('jsonwebtoken');

module.export = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, "I am jsut secret");
    next();
  } catch(err) {
    res.status(401).json({
      message: "AUth failed!"
    });
  }
};

'use strict';

const {HttpCode} = require(`../../constants`);

const requiredKeys = [`title`, `announce`, `category`];

module.exports = (req, res, next) => {
  const articleKeys = Object.keys(req.body);

  if (!requiredKeys.every((key) => articleKeys.includes(key))) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};

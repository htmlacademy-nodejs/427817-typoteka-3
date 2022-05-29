'use strict';

const {HttpCode} = require(`../../constants`);

const requiredKeys = [`text`];

module.exports = (req, res, next) => {
  const commentKeys = Object.keys(req.body);

  if (!requiredKeys.every((key) => commentKeys.includes(key))) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};

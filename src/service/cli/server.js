'use strict';

const {HttpCode, API_PREFIX} = require(`../../constants`);
const notFoundMessageText = `Not found.`;
const DEFAULT_PORT = 3000;
const routes = require(`../api`);
const express = require(`express`);

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());
    app.use(API_PREFIX, routes);

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(notFoundMessageText));

    app.listen(port);
  }
};

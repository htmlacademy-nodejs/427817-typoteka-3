'use strict';

const fs = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);
const notFoundMessageText = `Not found.`;
const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const express = require(`express`);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());
    
    app.get(`/posts`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        res.send([]);
      }
    });

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(notFoundMessageText));

    app.listen(port);
  }
};

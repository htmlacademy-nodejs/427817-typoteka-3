'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

/**
 * вывод страницы HTML
 *
 * @param {Response} res
 * @param {Integer} statusCode
 * @param {String} message
*/
const sendResponse = (res, statusCode, message) => {
  const template = `<!Doctype html>
  <html lang="ru">
    <head>
    <title>Titles</title>
    </head>
    <body>${message}</body>
  </html>`;

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

/**
 * обработка подключений.
 *
 * @param {Request} req
 * @param {Response} res
 */
const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found.`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);

        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, () => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    })
    .on(`error`, ({message}) => {
      console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
    });
  }
};

'use strict';

const help = require(`./help`);
const generate = require(`./generate`);
const server = require(`./server`);
const version = require(`./version`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [server.name]: server,
  [version.name]: version,
};
module.exports = {
  Cli,
};

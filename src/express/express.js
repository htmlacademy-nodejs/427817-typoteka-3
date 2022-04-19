'use strict';

const express = require(`express`);
const DEFAULT_PORT = 8080;
const path = require(`path`);
const PUBLIC_DIR = `public`;

const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.use((err, req, res, next) => res.status(500).render(`errors/500`));
app.use((req, res, next) => res.status(404).render(`errors/404`));

app.listen(DEFAULT_PORT);

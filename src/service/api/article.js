'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const checkArticle = require(`../middlewares/checkArticle`);
const articleValidator = require(`../middlewares/articleValidator`);
const commentValidator = require(`../middlewares/commentValidator`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await articleService.findAll();
    if (!articles) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, checkArticle(articleService), async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.findById(articleId);

    return res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, articleValidator, async (req, res) => {
    const newArticle = await articleService.create(req.body);

    return res.status(HttpCode.CREATED).json(newArticle);
  });

  route.put(`/:articleId`, [articleValidator, checkArticle(articleService)], async (req, res) => {
    const {articleId} = req.params;
    const newArticle = await articleService.update(articleId, req.body);

    return res.status(HttpCode.OK).json(newArticle);
  });

  route.delete(`/:articleId`, checkArticle(articleService), async (req, res) => {
    const {articleId} = req.params;
    await articleService.delete(articleId);

    return res.status(HttpCode.OK).send(`article with id ${articleId} deleted`);
  });

  route.get(`/:articleId/comments`, checkArticle(articleService), async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.findById(articleId);
    const comments = await commentService.findAll(article);

    return res.status(HttpCode.OK).json(comments);
  });

  route.post(`/:articleId/comments`, [commentValidator, checkArticle(articleService)], async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.findById(articleId);
    const newComment = await commentService.create(article, req.body);

    return res.status(HttpCode.CREATED).json(newComment);
  });

  route.delete(`/:articleId/comments/:commentId`, checkArticle(articleService), async (req, res) => {
    const {articleId, commentId} = req.params;
    const article = await articleService.findById(articleId);

    if (!commentService.findById(article, commentId)) {
      return res.status(HttpCode.NOT_FOUND).send(`comment with id ${commentId} not found`);
    }
    await commentService.delete(article, commentId);

    return res.status(HttpCode.OK).send(`comment with id ${commentId} deleted`);
  });
};

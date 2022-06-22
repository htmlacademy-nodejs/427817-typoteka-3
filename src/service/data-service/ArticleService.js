'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(data) {
    const newArticle = {
      ...data,
      id: nanoid(MAX_ID_LENGTH),
      createdDate: (new Date()).toLocaleString(),
      comments: []
    };
    this._articles.push(newArticle);

    return newArticle;
  }

  delete(id) {
    this._articles = this._articles.filter((item) => item.id !== id);
  }

  findAll() {
    return this._articles;
  }

  findById(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, data) {
    const newArticle = {...this.findById(id), ...data};
    this._articles[this._articles.findIndex((item) => item.id === id)] = newArticle;

    return newArticle;
  }
}

module.exports = ArticleService;

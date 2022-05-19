'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  search(str) {
    return this._articles.filter((item) => item.title.includes(str));
  }
}

module.exports = SearchService;

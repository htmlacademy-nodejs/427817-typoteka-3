'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findAll(obj) {
    return obj.comments;
  }

  create(obj, data) {
    const newComment = {id: nanoid(MAX_ID_LENGTH), ...data};
    obj.comments.push(newComment);

    return newComment;
  }

  delete(obj, commentId) {
    obj.comments = obj.comments.filter((item) => item.id !== commentId);
  }

  findById(obj, commentId) {
    return obj.comments.find((item) => item.id === commentId);
  }
}
module.exports = CommentService;

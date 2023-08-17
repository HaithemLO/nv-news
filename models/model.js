const db = require('../db/connection');

const readTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({
        rows
    }) =>{
        return rows
    });
};


const readCommentsByArticleId = (article_id) => {
  return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'No comments found for this article' });
      }
      return rows;
    });
};

module.exports = {readTopics,readCommentsByArticleId}
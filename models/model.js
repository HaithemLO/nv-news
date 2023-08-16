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
      return rows;
    });
};

module.exports = {readTopics,readCommentsByArticleId}
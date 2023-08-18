const db = require('../db/connection');
const endpointsJSON = require('../');

const readTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({
        rows
    }) =>{
        return rows
    });
};


const readArticleById = (article_id) => {
    if (!Number.isInteger(Number(article_id))) {
      return Promise.reject({ status: 400, msg: 'Invalid data type for article_id' });
    }
  
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: 'Article not found' });
        }
        return rows[0];
      });
  };


const readArticles = () => {
  return db.query(`
    SELECT articles.*, COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC;
  `)
    .then(({ rows }) => {
      return rows.map((row) => {
        // Remove body property from each article
        const { body, ...article } = row;
        return article;
      });
    });
};

const readCommentsByArticleId = (article_id) => {
  return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        // Check if the article exists before rejecting with a 404 status
        return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
          .then(({ rows: articles }) => {
            if (articles.length === 0) {
              return Promise.reject({
                status: 404,
                msg: `No comments found for this article`,
              });
            } else {
              return [];
            }
          });
      }
      return rows;
    });
};

module.exports = {readTopics,readArticles,readArticleById,readCommentsByArticleId}

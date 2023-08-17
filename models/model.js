const db = require('../db/connection');
const endpointsJSON = require('../endpoints.json');


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


const createComment = (article_id, username, body) => {
  if (!Number.isInteger(Number(article_id))) {
    return Promise.reject({ status: 400, msg: 'Invalid data type for article_id' });
  }
  
  return db.query(
    `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
    [article_id, username, body]
  )
    .then(({ rows }) => {
      return rows[0];
    });
};
module.exports = {readTopics,readArticles,readArticleById,createComment}

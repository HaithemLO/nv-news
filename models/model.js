const db = require('../db/connection');

const readTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({
        rows
    }) =>{
        return rows
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


module.exports = {readTopics,readArticles}
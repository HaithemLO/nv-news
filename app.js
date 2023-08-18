const express = require('express');
const app = express();
const {getTopics,getCommentsByArticleId} = require('./controller/controller')





// GET /api/topics
app.get('/api/topics',getTopics);


app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).json({ message: 'Invalid article_id data type' });
  } else if (err.status === 404) {
    res.status(404).json({ message: err.msg });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = app;
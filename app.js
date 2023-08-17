const express = require('express');
const app = express();
const {getTopics,getCommentsByArticleId} = require('./controller/controller')





// GET /api/topics
app.get('/api/topics',getTopics);


app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.use((err, req, res, next) => {
 

  // Handle different types of errors
  if (err.status) {
    res.status(err.status).json({ message: err.msg });
  }  else if (err.message === 'Invalid data type') {
      res.status(400).json({ message: 'Invalid data type for article_id' });
    }else if (err.code === '23503' && err.constraint === 'comments_article_id_fkey') {
      res.status(200).json({ comments: [] }); // Return an empty array when no comments found
    }else {
    res.status(404).json({ message: 'Not Found' });
  }
  
});
module.exports = app;
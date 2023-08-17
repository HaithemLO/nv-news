const express = require('express');
const app = express();
const {getTopics,getApis,getArticleById,getArticles,patchArticleVotes } = require('./controller/controller')
const endpointsJSON = require('./endpoints.json');






// GET /api/topics
app.get('/api/topics',getTopics);


app.get('/api', getApis)

app.get('/api/articles/:article_id',getArticleById)

app.patch('/api/articles/:article_id', patchArticleVotes);


app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
  
    // Handle different types of errors
    if (err.status) {
      res.status(err.status).json({ message: err.msg });
    }  else if (err.message === 'Invalid data type') {
        res.status(400).json({ message: 'Invalid data type for article_id' });
      }else {
      res.status(404).json({ message: 'Not Found' });
    }
  });



app.get('/api/articles', getArticles);
module.exports = app;
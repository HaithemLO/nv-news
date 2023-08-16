const express = require('express');
const app = express();
const {getTopics,getCommentsByArticleId} = require('./controller/controller')





// GET /api/topics
app.get('/api/topics',getTopics);


app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.use((err,req,res,next) => {



})
module.exports = app;
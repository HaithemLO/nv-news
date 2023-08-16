const express = require('express');
const app = express();
const {getTopics,getArticles} = require('./controller/controller')





// GET /api/topics
app.get('/api/topics',getTopics);



app.use((err,req,res,next) => {



})

app.get('/api/articles', getArticles);
module.exports = app;
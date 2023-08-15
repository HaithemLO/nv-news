const express = require('express');
const app = express();
const {getTopics,getApis,getArticleById} = require('./controller/controller')
const endpointsJSON = require('./endpoints.json');





// GET /api/topics
app.get('/api/topics',getTopics);


app.get('/api', getApis)

app.get('/api/articles/:article_id',getArticleById)

app.use((err,req,res,next) => {

  

})
module.exports = app;
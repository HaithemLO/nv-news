const express = require('express');
const app = express();
const getTopics = require('./controller/controller')





// GET /api/topics
app.get('/api/topics',getTopics);



app.use((err,req,res,next) => {



})
module.exports = app;
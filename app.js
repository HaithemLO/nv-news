const express = require('express');
const app = express();
const getTopics = require('./controller/controller')





// GET /api/topics
app.get('/api/topics',getTopics);



app.use((err,req,res,next) => {

    console.log(err)

})
module.exports = app;
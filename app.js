const express = require('express');
const app = express();
const getTopics = require('./controller/controller')
const endpointsJSON = require('./endpoints.json');





// GET /api/topics
app.get('/api/topics',getTopics);

app.get('/api', (req, res) => {
    // Create a response object similar to the expected endpoints JSON
    const availableEndpoints = {};
  
    for (const endpoint in endpointsJSON) {
      availableEndpoints[endpoint] = {
        description: endpointsJSON[endpoint].description,
        queries:endpointsJSON[endpoint].queries,
        exampleResponse:endpointsJSON[endpoint].exampleResponse,
        format:endpointsJSON[endpoint].format
      };
    }
  
    res.status(200).json(availableEndpoints);
  });


app.use((err,req,res,next) => {



})
module.exports = app;
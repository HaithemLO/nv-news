const  {readTopics,readApis}  = require('../models/model')
const endpointsJSON = require('../endpoints.json');


const getTopics = (req,res,next) => {

    readTopics()
    .then((topics) => {
        res.status(200).send({topics:topics});
    })
    .catch(next)
    
}

const getApis = (req, res) => {
    const documentation = {};
  
    for (const endpoint in endpointsJSON) {
      documentation[endpoint] = {
        description: endpointsJSON[endpoint].description,
        queries: endpointsJSON[endpoint].queries || [],
        exampleResponse: endpointsJSON[endpoint].exampleResponse || {},
      };
    }
  
    res.status(200).json(documentation);
  };


module.exports = {getTopics,getApis}
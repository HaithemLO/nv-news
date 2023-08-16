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
   


  res.status(200).json(endpointsJSON);
  };


module.exports = {getTopics,getApis}
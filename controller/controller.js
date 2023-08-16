const  {readTopics,readArticles}  = require('../models/model')


const getTopics = (req,res,next) => {

    readTopics()
    .then((topics) => {
        res.status(200).send({topics:topics});
    })
    .catch(next)
    
}

const getArticles = (req, res, next) => {
  readArticles()
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch(next);
};

module.exports = {getTopics,getArticles}
const  {readTopics,readApis,readArticleById,readArticles}  = require('../models/model')
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

  const getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    readArticleById(article_id)
      .then((article) => {
        res.status(200).json({ article });
      })
      .catch(next);
  };


const getArticles = (req, res, next) => {
  readArticles()
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch(next);
};

module.exports = {getTopics,getApis,getArticles,getArticleById}

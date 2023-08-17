const  {readTopics,readApis,readArticleById,readArticles,updateArticleVotes}  = require('../models/model')
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

const patchArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (inc_votes === undefined) {
    return next({ status: 400, msg: 'Bad Request: Missing inc_votes in request body' });
  }

  if (typeof inc_votes !== 'number') {
    return next({ status: 400, msg: 'Bad Request: Invalid data type for inc_votes' });
  }

  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).json({ article });
    })
    .catch(next);
};

module.exports = {getTopics,getApis,getArticles,getArticleById,patchArticleVotes}

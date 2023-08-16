const  {readTopics,readCommentsByArticleId}  = require('../models/model')


const getTopics = (req,res,next) => {

    readTopics()
    .then((topics) => {
        res.status(200).send({topics:topics});
    })
    .catch(next)
    
}

const getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    readCommentsByArticleId(article_id)
      .then((comments) => {
        res.status(200).json({ comments });
      })
      .catch(next);
  };

module.exports = {getTopics,getCommentsByArticleId}
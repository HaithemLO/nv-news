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

  if (isNaN(article_id)) {
    return res.status(400).json({ message: 'Invalid article_id data type' });
  }

  readCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).json({ comments });
    })
    .catch(next);
};

module.exports = {getTopics,getCommentsByArticleId}
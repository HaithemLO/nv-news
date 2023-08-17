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
      res.status(200).send({ comments });
    })
    .catch((err) => {
      if (err.code === '22P02') {
        // Handling PostgreSQL invalid input syntax for integer error
        res.status(400).json({ message: 'Invalid article_id data type' });
      } else if (err.status === 404) {
        res.status(404).json({ message: err.msg });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
};

module.exports = {getTopics,getCommentsByArticleId}
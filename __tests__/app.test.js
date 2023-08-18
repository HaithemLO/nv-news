const request = require('supertest');
const app = require('../app'); 
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index')
const db = require('../db/connection');
const articles = require('../db/data/test-data/articles');



beforeEach(() => {
return seed(testData)

})

afterAll(() => {
  return db.end()
})

describe('GET /api/topics', () => {



  it('should respond with status 404 for an invalid endpoint', () => {
    return request(app)
      .get('/api/invalid')
      .expect(404);
  });

  it('should respond with an array of objects that is not empty', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res)=>{
        expect(res.body.topics.length).not.toBe(0)
        
     
  });
      
  });




  it('should respond with status 200 and an array of objects with the correct datatypes', () => {
    return request(app)
      .get('/api/topics')

      .expect(200)
      .then((res)=>{
        
         res.body.topics.forEach((topics) =>{
          expect(typeof topics.slug).toBe('string'),
          expect(typeof topics.description).toBe('string')

          expect(res.body.topics.length).toBe(3)
         
      })
     
  });
});



});


describe('GET /api/articles/:article_id/comments', () => {

    
  it('should respond with an array of comments for the given article_id', () => {
    const article_id = 1; // Use a valid article_id
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(200)
      .then((res) => {
        const comments = res.body.comments;
        expect(Array.isArray(comments)).toBe(true);
        expect(comments.length).toBe(11);

       
        
          comments.forEach((comment) => {
            expect(comment).toHaveProperty('comment_id');
            expect(comment).toHaveProperty('votes');
            expect(comment).toHaveProperty('created_at');
            expect(comment).toHaveProperty('author');
            expect(comment).toHaveProperty('body');
            expect(comment).toHaveProperty('article_id', article_id);

           
          });
        
      });
  });

  it('should respond with status 404 for an non-existent article_id', () => {
    return request(app)
      .get('/api/articles/9321331/comments') // Use a non-existing article_id
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe('No comments found for this article');
      });
      
  });

  it('should respond with status 400 for an invalid data type in article_id', () => {
    return request(app)
      .get('/api/articles/sadsa/comments') // Use an invalid data type for article_id
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid article_id data type');
      });
  });
  it('should respond with comments served with the most recent comments first', () => {
    const article_id = 1; // Use a valid article_id
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(200)
      .then((res) => {
        const comments = res.body.comments;

        // Check if comments are served with the most recent first using Jest Sorted
        expect(comments).toBeSortedBy('created_at', { descending: true });
      });
  });

  it('should respond with an empty array when article exists but has no comments', () => {
    const article_id = 2; // Use a valid article_id for an article with no comments
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.comments)).toBe(true);
        expect(res.body.comments.length).toBe(0);
        
      });
  });

  
  
  
  
  

  it('should respond with status 400 for an invalid data type in article_id', () => {
    return request(app)
      .get('/api/articles/sadsa/comments') // Use an invalid data type for article_id
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Invalid article_id data type');
      });
  });
});
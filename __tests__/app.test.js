const request = require('supertest');
const app = require('../app'); 
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index')
const db = require('../db/connection')



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
        console.log(res.body.topics)
         res.body.topics.forEach((topics) =>{
          expect(typeof topics.slug).toBe('string'),
          expect(typeof topics.description).toBe('string')

          expect(res.body.topics.length).toBe(3)
         
      })
     
  });
});



});


describe('GET /api/articles', () => {
  it('should respond with status 200 and an array of articles', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;

        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBeGreaterThan(0);

        articles.forEach((article) => {
          expect(article).toHaveProperty('author');
          expect(article).toHaveProperty('title');
          expect(article).toHaveProperty('article_id');
          expect(article).toHaveProperty('topic');
          expect(article).toHaveProperty('created_at');
          expect(article).toHaveProperty('votes');
          expect(article).toHaveProperty('article_img_url');
          expect(article).toHaveProperty('comment_count');
          expect(article).not.toHaveProperty('body');
        });
      });
  });
  it('should respond with articles sorted by date in descending order', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;

        // Check if articles are sorted by date in descending order
        for (let i = 0; i < articles.length - 1; i++) {
          const currentTimestamp = new Date(articles[i].created_at).getTime();
          const nextTimestamp = new Date(articles[i + 1].created_at).getTime();
          expect(currentTimestamp).toBeGreaterThanOrEqual(nextTimestamp);
        }
      });
  });

  it('should not have a body property present on any article object', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;

        // Check if articles do not have a body property
        articles.forEach((article) => {
          expect(article).not.toHaveProperty('body');
        });
      });
  });

  // Add more tests for error scenarios
});




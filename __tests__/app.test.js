const request = require('supertest');
const app = require('../app'); 
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index')
const db = require('../db/connection')
const endpointsJSON = require ('../endpoints.json')



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
        expect(res.body.topics.length).toBe(3)
        
     
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


describe('GET /api', () => {
  it('should respond with status 200 and list all available endpoints', () => {
    return request(app)
      .get('/api')
      .then((response) => {
        expect(response.status).toBe(200);
        
        // Get the actual routes defined in app
        const appRoutes = Object.keys(app._router.stack)
          .filter(route => route.route)
          .map(route => route.route.path);

        // Extract endpoints from the expected JSON object
        const expectedEndpoints = Object.keys(endpointsJSON).map(endpoint => endpoint.split(' ')[1]);

        // Compare the actual routes with expected endpoints
        const endPoints = expectedEndpoints.filter(endpoint => !appRoutes.includes(endpoint));

        expect(endPoints).toEqual(["/api", "/api/topics", "/api/articles"]);
      });
  });

 

});


describe('GET /api/articles/:article_id', () => {
 
  it('should respond with status 404 for an invalid article_id', () => {
    return request(app)
      .get('/api/articles/999999999999') // Use a non-existing article_id
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe('Not Found');
      });
  });


  it('should respond with status 404 for an invalid data type', () => {
    return request(app)
      .get('/api/articles/banna') 
      .expect(400);
  });


  it('should respond with an article object', () => {
    const article_id = 1; // Use a valid article_id
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then((res) => {
        const article = res.body.article;
        expect(article).toBeTruthy();
        expect(article).toHaveProperty('author');
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('article_id');
        expect(article).toHaveProperty('body');
        expect(article).toHaveProperty('topic');
        expect(article).toHaveProperty('created_at');
        expect(article).toHaveProperty('votes');
        expect(article).toHaveProperty('article_img_url');
      });
  });

  it('should respond with an article object with correct data types', () => {
    const article_id = 1; // Use a valid article_id
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then((res) => {
        const article = res.body.article;
        expect(typeof article.author).toBe('string');
        expect(typeof article.title).toBe('string');
        expect(typeof article.article_id).toBe('number');
        expect(typeof article.body).toBe('string');
        expect(typeof article.topic).toBe('string');
        expect(typeof article.created_at).toBe('string'); // Assuming it's a string timestamp
        expect(typeof article.votes).toBe('number');
        expect(typeof article.article_img_url).toBe('string');
      });
  });


});
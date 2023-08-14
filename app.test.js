const request = require('supertest');
const app = require('./app'); 
const seed = require('./db/seeds/seed');
const testData = require('./db/data/test-data/index')
const db = require('./db/connection')



beforeEach(() => {
return seed(testData)

})

afterAll(() => {
  return db.end()
})

describe('GET /api/topics', () => {

  it('should respond with status 404 for unsupported methods', () => {
    return request(app)
      .post('/api/topics')
      .expect(404);
  });

  it('should respond with status 404 for an invalid endpoint', () => {
    return request(app)
      .get('/api/invalid')
      .expect(404);
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
         
      })
     
  });
});



});



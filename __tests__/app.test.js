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


describe('GET /api', () => {
  it('should respond with status 200 and list all available endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(endpointsJSON); // Compare the entire JSON structure
      });
  });
});

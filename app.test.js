const request = require('supertest');
const app = require('./app'); 
const seed = require('./db/seeds/seed');
const testData = require('./db/data/test-data/index')
const db = require('./db/connection')
const endpointsJSON = require ('./endpoints.json')



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



const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe("Main Endpoint", () => {

  describe("GET /", () => {
    
    it("should get a 200 response", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.text.should.equal('ecoext endpoint');
          done();
        });
    });
    
  });
});
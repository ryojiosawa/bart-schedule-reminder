var sinon = require('sinon');
var expect = require('expect.js');
var request = require('supertest');
var app = require('../../server');
var helper = require('../../server/lib/helper');
var jobController = require('../../server/jobs/job-controller');

describe('Route Test Suites', function() {

  describe('Job Routes Tests', function() {
    it('GET request to /jobs should invoke jobController.getJobs', function(done) {
      sinon.spy(jobController, 'getJobs');

      request(app)
        .get('/jobs')
        .end(function(err, res) {
          expect(jobController.getJobs.called).to.be.true;
          jobController.getJobs.restore();
          done();
        });
    });

    it('GET request to /jobs/:job_id should invoke helpers.invalidMethodHandler', function(done) {
      sinon.spy(helper, 'invalidMethodHandler');

      request(app)
        .get('/jobs/1')
        .end(function(err, res) {
          expect(helper.invalidMethodHandler.called).to.be.true;
          helper.invalidMethodHandler.restore();
          done();
        });

    });

    it('POST request to /jobs should invoke jobController.createJob', function(done) {
      sinon.spy(jobController, 'createJob');

      request(app)
        .post()
        .send({})
        .end(function(err, res) {
          expect(jobController.createJob.called).to.be.true;
          jobController.createJob.restore();
          done();
        });
    });

    it('DELETE request to /jobs/job_id should invoke jobController.deleteJob', function(done) {
      sinon.spy(jobController, 'deleteJob');

      request(app)
        .post()
        .send({})
        .end(function(err, res) {
          expect(jobController.deleteJob.called).to.be.true;
          jobController.deleteJob.restore();
          done();
        });
    });
  });
});
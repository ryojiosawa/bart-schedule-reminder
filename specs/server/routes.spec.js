var sinon = require('sinon');
var expect = require('expect.js');
var request = require('supertest');
var app = require('../../server');
var helper = require('../../server/lib/helper');
var Job = require('../../server/jobs/job-model');
var jobController = require('../../server/jobs/job-controller');

describe('Route Test Suites', function() {

  describe('Job Routes Tests', function() {
    var job_id = null;

    before(function(done) {
      Job.remove({})
        .exec()
        .then(function() {
          Job.create({ phone: '123-456-789', station: "powl", direction: "n" })
            .then(function(job) {
              job_id = job._id;
              done();
            });
        });
    });

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

    it('GET request to /jobs/:job_id should invoke jobController.getJob', function(done) {
      sinon.spy(jobController, 'getJob');

      request(app)
        .get('/jobs/' + job_id)
        .end(function(err, res) {
          expect(jobController.getJob.called).to.be.true;
          jobController.getJob.restore();
          done();
        });
    });

    it('POST request to /jobs should invoke jobController.createJob', function(done) {
      sinon.spy(jobController, 'createJob');

      request(app)
        .post('/jobs')
        .send({ phone: '123-456-789', station: "powl", direction: "n" })
        .end(function(err, res) {
          expect(jobController.createJob.called).to.be.true;
          jobController.createJob.restore();
          done();
        });
    });

    it('POST request to /jobs/:job_id should invoke jobController.updateJob', function(done) {
      sinon.spy(jobController, 'updateJob');

      request(app)
        .post('/jobs/' + job_id)
        .send({})
        .end(function(err, res) {
          expect(jobController.updateJob.called).to.be.true;
          jobController.updateJob.restore();
          done();
        });
    });

    it('DELETE request to /jobs/job_id should invoke jobController.deleteJob', function(done) {
      sinon.spy(jobController, 'deleteJob');

      request(app)
        .del('jobs/' + job_id)
        .send({})
        .end(function(err, res) {
          expect(jobController.deleteJob.called).to.be.true;
          jobController.deleteJob.restore();
          done();
        });
    });
  });
});
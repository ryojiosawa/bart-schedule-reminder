var db = require('../../server/db-config.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server.js');
var Job = require('../../server/models/job-model');

describe('Job Test Suite', function() {

  beforeEach(function(done) {
    Job.remove()
      .exec(function() {
        done();
      });
  });

  describe('POST: /jobs', function() {
    xit('should return an error message upon invalid request', function(done) {
      request(app)
        .post('/jobs')
        .send({ phone: "123-456-789", direction: "n" })
        .expect(500)
        .end(function(err, res) {
          expect(res.text).to.include('ValidationError');
          done();
        });
    });

    it('should insert a new job', function(done) {
      request(app)
        .post('/jobs')
        .send({ phone: "123-456-789", station: "powl", direction: "n" })
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;

          Job.findOne({ _id: res.body._id })
            .select('phone station')
            .exec(function(err, job) {
              if (err) throw err;

              expect(job.phone).to.be.equal("123-456-789");
              expect(job.station).to.be.equal("powl");
              done();
            });
        });
    });
  });

  describe('GET: /jobs', function() {
    beforeEach(function(done) {
      Job.remove()
        .exec(function() {
          Job.create([
            { phone: "123-456-789", station: "powl", direction: "n" },
            { phone: "123-456-789", station: "powl", direction: "n" }
          ])
            .then(function() {
              done();
            })
        });
    });

    it('should return a list of jobs', function(done) {
      request(app)
        .get('/jobs')
        .expect(200)
        .end(function(err, res) {
          expect(res.body.length).to.be.equal(2);
          expect(res.body[0].phone).to.equal("123-456-789");
          expect(res.body[0].station).to.equal("powl");
          done();
        });
    });
  });

  describe('GET: /jobs/:job_id & POST: /jobs/:job_id', function() {
    var job_id = null;
    beforeEach(function(done) {
      Job.create({ phone: "123-456-789", station: "powl", direction: "n" })
        .then(function(job) {
          job_id = job._id;
          done();
        });
    });

    it('GET: /jobs/:job_id should return a single job', function(done) {
      request(app)
        .get('/jobs/' + job_id)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.phone).to.be.equal("123-456-789");
          expect(res.body.station).to.be.equal("powl");
          expect(res.body.direction).to.be.equal("n");
          done();
        });
    });

    it('POST: /jobs/:job_id should update the existing job', function(done) {
      request(app)
        .post('/jobs/' + job_id)
        .send({ phone: "456-789-123", station: "glen" })
        .expect(200)
        .end(function(err, res) {
          expect(res.body.phone).to.be.equal("456-789-123");
          expect(res.body.station).to.be.equal("glen");
          expect(res.body.direction).to.be.equal("n");
          done();
        });
    });
  });

  it('DELETE: /jobs/job_id should delete a specified job', function(done) {
    Job.create({ phone: "123-456-789", station: "powl", direction: "n" })
      .then(function(res) {

        request(app)
          .delete('/jobs/' + res._id)
          .expect(200)
          .end(function(req, res) {
            expect(res.body.message).to.equal('Successfully deleted');
            Job.findOne({_id: res._id})
              .exec(function(res) {
                done();
              });
          });
      });
  });
});

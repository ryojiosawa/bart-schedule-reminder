var db = require('../../server/db-config.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server.js');
var Job = require('../../server/jobs/job-model');

describe('Job Test Suite', function() {

  beforeEach(function(done) {
    Job.remove()
      .exec(function() {
        done();
      });
  });

  describe('POST: /jobs', function() {
    it('should return an error message upon invalid request', function(done) {
      request(app)
        .post('/jobs')
        .send({ phone: "123-456-789", destination: "rich", direction: "n" })
        .expect(500)
        .end(function(err, res) {
          expect(res.text).to.include('ValidationError');
          done();
        });
    });

    it('should insert a new job', function(done) {
      request(app)
        .post('/jobs')
        .send({ phone: "123-456-789", station: {abbr: "powl"}, destination: "rich", direction: "n" })
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
            { phone: "123-456-789", station: "powl", destination: "rich", direction: "n" },
            { phone: "123-456-789", station: "powl", destination: "rich", direction: "n" }
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

  it('GET: /jobs/:job_id should return correct error message', function(done) {
    request(app)
      .get('/jobs/1')
      .expect(405)
      .end(function(err, res) {
        expect(res.body.message).to.equal("Method not allowed");
        done();
      });
  });

  it('DELETE: /jobs/job_id should delete a specified job', function(done) {
    Job.create({ phone: "123-456-789", station: "powl", destination: "rich", direction: "n" })
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

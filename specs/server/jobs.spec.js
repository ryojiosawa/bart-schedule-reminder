var db = require('../../server/db-config.js');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../server.js');
var Job = require('../../server/jobs/job-model');

describe('Job Test Suite', function() {

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
        .send({ phone: "123-456-789", station: "powl", destination: "rich", direction: "n" })
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

  xdescribe('GET: /jobs', function() {
    it('should return a list of jobs', function(done) {
      db.ReportedCase.bulkCreate([
        {
          disease_id: disease_id,
          latitude: 12.678,
          longitude: 23.456,
          date: Date.now(),
          description: "Ebola is bad"
        },
        {
          disease_id: disease_id,
          latitude: 12.345,
          longitude: 23.456,
          date: Date.now(),
          description: "Ebola is really bad"
        }
      ])
        .success(function(cases) {
          request(app)
            .get('/api/cases')
            .expect(200)
            .end(function(err, res) {
              expect(res.body.length).to.be.equal(2);
              expect(res.body[0].latitude).to.equal(12.678);
              done();
            });
        });
    });
  });

  xdescribe('GET: /jobs/:job_id', function() {
    it('should return a single case', function(done) {
      db.ReportedCase.create({
        disease_id: disease_id,
        latitude: 12.345,
        longitude: 23.456,
        date: Date.now(),
        description: "Ebola is bad"
      }).then(function(created) {
        request(app)
          .get('/api/cases/' + created.id)
          .expect(200)
          .end(function(err, res) {
            expect(res.body.latitude).to.equal(12.345);
            done();
          });
      });
    });

    it('should respond an empty result if not exist', function(done) {
      request(app)
        .get('/api/cases/' + 3000)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.deep.equal({});
          done();
        });
    });
  });

  xdescribe('DELETE: /jobs/job_id', function() {
    it('should return "Method not allowed" error', function(done) {
      request(app)
        .delete('/api/cases/1')
        .expect(404)
        .end(function(req, res) {
          expect(res.body.message).to.be.equal('Method not allowed');
          done();
        });
    });
  });
});

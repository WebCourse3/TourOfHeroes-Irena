//added 2 checks, deleted the stuff that we were asked to delete

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('server');
var should = chai.should();
var heroes = require('heroes.js');

chai.use(chaiHttp);

describe('Heroes', function () {
	describe('Heroes Testing', function () {
		it('should list ALL heroes on /heroes GET', function (done) {
			chai.request(server)
				.get('/heroes')
				.end(function (err, res) {
					res.should.have.status(200);
					res.should.be.json;
					done();
				});
		});

		it('should list a SINGLE hero on /heroes GET', function(done) {
			chai.request(server)
				.get('/heroes/'+heroes[0].id)
				.end(function(err, res){
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('id');
					res.body.should.have.property('name');
					res.body.id.should.equal(heroes[0].id);
					done();
				});
		});

		it('should update a SINGLE hero on /heroes PUT', function (done) {
			chai.request(server)
				.get('/heroes')
				.end(function (err, res) {
					var oldLen = res.body.length;
					chai.request(server)
						.put('/heroes/' + res.body[0].id)
						.end(function (error, response) {
							response.should.have.status(200);
							response.should.be.json;
							var newLen = response.body.length;
							newLen.should.equal(oldLen);
							done();
						});
				});
		});

		it('should add a SINGLE hero on /heroes POST', function (done) {
			chai.request(server)
				.post('/heroes')
				.send({'id': '4', 'name': 'roy'})
				.end(function (err, res) {
					res.should.have.status(200);
					res.should.be.json;
					var len = res.body.length - 1;
					res.body[len].name.should.equal('roy');
					res.body[len].id.should.equal('4');
					done();
				});
		});


		it('should delete a SINGLE hero on /heroes DELETE using ID', function (done) {
			chai.request(server)
				.get('/heroes')
				.end(function (err, res) {
					var oldLen = res.body.length - 1;
					chai.request(server)
						.delete('/heroes/' + res.body[0].id)
						.end(function (error, response) {
							response.should.have.status(200);
							response.should.be.json;
							var newLen = response.body.length;
							newLen.should.equal(oldLen);
							done();
						});
				});
		});

		it('should delete a SINGLE hero on /heroes DELETE using name', function (done) {
			chai.request(server)
				.get('/heroes')
				.end(function (err, res) {
					var oldLen = res.body.length - 1;
					chai.request(server)
						.delete('/heroes/' + res.body[0].name)
						.end(function (error, response) {
							response.should.have.status(200);
							response.should.be.json;
							var newLen = response.body.length;
							newLen.should.equal(oldLen);
							done();
						});
				});
		});

	});
});

after('after all', function () {
	server.close();
});

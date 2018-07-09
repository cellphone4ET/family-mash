'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const expect = chai.expect
const should = chai.should();

const {FamilyMember} = require('../models');
const {app, runServer, closeServer} = require('../server.js');
const {TEST_DATABASE_URL, JWT_SECRET} = require('../config');
let test_token
let userId


chai.use(chaiHttp);


function seedFamilyMemberData() {
  console.info('seeding family member data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      name: faker.name.firstName(),
      relation: faker.name.prefix(),
      birthday: faker.random.number(60),
      significant_other: faker.name.firstName(),
      anniversary: faker.date.past(30),
      notes: faker.lorem.sentences(),
      photo_url: faker.image.avatar()
    });
  }
  return FamilyMember.insertMany(seedData);
}

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

describe('family mash api', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
			return chai.request(app)
			.post('/api/users')
			.send({username:"test", password:"test123"})
			.then(function(res) {
				test_token = res.body.authToken;
				userId = res.body.id;
			}).then(function(){
				return seedFamilyMemberData()
			});
	});

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  //static endpoints
  describe('index page', function () {
    it('should exist', function () {
      return chai.request(app)
        .get('/')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  });

  //GET endpoints
  describe('it should return all existing family members', function () {
    it('should have status of 200', function () {
      let res;
      return chai.request(app)
      .get('/api/family-members')
      .set('Authorization', `Bearer ${test_token}`)
			.then(function(_res) {
				res=_res;
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf.at.least(1);
        return FamilyMember.count();
      })
        res.body.should.have.lengthOf(count);
      })
    });

    it('should return posts with the right fields', function() {

      let resFamilyMember;
      return chai.request(app)
        .get('/api/family-members')
        .set('Authorization', `Bearer ${test_token}`)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).is.a('array');
          expect(res.body).to.have.lengthOf.at.least(1);

          res.body.forEach(function (familyMember) {
            expect(familyMember).is.a('object');
            expect(familyMember).to.include.keys("id", "name", 'relation', 'birthday', 'significant_other', 'anniversary', 'notes', 'photo_url');
          });

          resFamilyMember = res.body[0];
          return FamilyMember.findById(resFamilyMember.id)
        })
        .then(familyMember => {
          resFamilyMember.name.should.equal(familyMember.name);
          expect(resFamilyMember.relation).to.equal(familyMember.relation);
          expect(resFamilyMember.notes).to.equal(familyMember.notes);
        })
    });

  describe('POST endpoint', function() {
    it('should add a new family member', function() {
      const newFamilyMember = {
        name: faker.name.firstName(),
        relation: faker.name.prefix(),
        birthday: faker.random.number(60),
        significant_other: faker.name.firstName(),
        anniversary: faker.date.past(30),
        notes: faker.lorem.sentences(),
        photo_url: faker.image.avatar()
      };

      return chai.request(app)
        .post('/api/family-members')
        .send(newFamilyMember)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys("id", "name", 'relation', 'birthday', 'photo_url');
          expect(res.body.name).to.equal(newFamilyMember.name);
          res.body.id.should.not.be.null;
          res.body.relation.should.equal(newFamilyMember.relation);
          expect(res.body.photo_url).to.equal(newFamilyMember.photo_url);
          return FamilyMember.findById(res.body.id);
        })
        .then(function (FamilyMember) {
          FamilyMember.name.should.equal(newFamilyMember.name);
          FamilyMember.relation.should.equal(newFamilyMember.relation);
          FamilyMember.photo_url.should.equal(newFamilyMember.photo_url);
        })
    })
  })

  describe('PUT endpoint', function () {
    it('should update fields you send over', function() {

      const updateData = {
        name: 'Mary',
        relation: 'mother',
        significant_other: 'Joseph'
      };

      return FamilyMember
        .findOne()
        .then(familyMember => {
          updateData.id = familyMember.id;

          return chai.request(app)
            .put(`/api/family-members/${familyMember.id}`)
            .send(updateData);
      })

      .then(res => {
        res.should.have.status(204);
        return FamilyMember.findById(updateData.id);
      })

      .then(familyMember => {
        familyMember.name.should.equal(updateData.name);
        familyMember.relation.should.equal(updateData.relation);
        familyMember.significant_other.should.equal(updateData.significant_other);
      })
    })
  })

  describe('DELETE endpoint', function () {

    it('should delete a post by id', function () {
      let familyMember;

      return FamilyMember
        .findOne()
        .then(_familyMember => {
          familyMember = _familyMember;
          return chai.request(app).delete(`/api/family-members/${familyMember.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return FamilyMember.findById(familyMember.id);
        })
        .then(_familyMember => {
          should.not.exist(_familyMember);
        });

    });
  });


});

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const expect = chai.expect;

const {FamilyMember} = require('../models');
const {app, runServer, closeServer} = require('../server.js');
const {TEST_DATABASE_URL} = require('../config');

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
    return seedFamilyMemberData();
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
  describe('GET route', function () {
    it('should have status of 200', function () {
      let res;
      return chai.request(app)
      .get('/api/family-members')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf.at.least(1);
      });
    });
    });
});

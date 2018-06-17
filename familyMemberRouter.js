const express = require('express');
const router = express.Router();

const {FamilyMembers} = require('./models');


//get endpoint
router.get('/', (re, res) => {
  res.json(BlogPosts.get());
});

module.exports = router;

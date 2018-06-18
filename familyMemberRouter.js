const express = require('express');
const router = express.Router();

const {FamilyMembers} = require('./models');


//get endpoint
router.get('/family-members', (req, res) => {
  FamilyMembers
    .find()
    .then(posts => {
      res.json(posts.map(post => post.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong' });
    });
});

router.get('/family-members/:id', (req, res) => {
  FamilyMembers
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong' });
    });
});

module.exports = router;

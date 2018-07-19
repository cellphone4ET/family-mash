const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const moment = require("moment");

const { FamilyMember } = require("./models");
const { jwtStrategy } = require("../auth");
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/", jwtAuth, (req, res) => {
  FamilyMember.find({ user: req.user.id })
    .then(familyMembers => {
      res.json(familyMembers.map(familyMember => familyMember.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

router.get("/:id", jwtAuth, (req, res) => {
  FamilyMember.findById(req.params.id)
    .then(familyMember => res.json(familyMember.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

router.post("/", jwtAuth, jsonParser, (req, res) => {
  const requiredFields = ["name", "relation", "birthday"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  FamilyMember.create({
    name: req.body.name,
    relation: req.body.relation,
    birthday: req.body.birthday,
    simpleBirthdayDate: moment(req.body.birthday).format("MM-DD"),
    significant_other: req.body.significant_other,
    anniversary: req.body.anniversary,
    simpleAnniversary: moment(req.body.anniversary).format("MM-DD"),
    notes: req.body.notes,
    photo_url: req.body.photo_url,
    user: req.user.id
  })
    .then(FamilyMember => res.status(201).json(FamilyMember.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.delete("/:id", jwtAuth, (req, res) => {
  FamilyMember.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

router.put("/:id", jwtAuth, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updateableFields = [
    "name",
    "relation",
    "birthday",
    "significant_other",
    "anniversary",
    "notes",
    "photo_url"
  ];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  if (req.body.anniversary) {
    updated.simpleAnniversary = moment(req.body.anniversary).format("MM-DD");
  }

  if (req.body.birthday) {
    updated.simpleBirthdayDate = moment(req.body.birthday).format("MM-DD");
  }

  FamilyMember.findByIdAndUpdate(
    req.params.id,
    { $set: updated },
    { new: true }
  )
    .then(updatedFamilyMember => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

module.exports = { router };

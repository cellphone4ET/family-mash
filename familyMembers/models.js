'use strict';

const mongoose = require('mongoose');
const moment = require("moment");

mongoose.Promise = global.Promise;
moment().format();

const familyMemberSchema = mongoose.Schema({
    name: {type: String, required: true},
    relation: {type: String, required: true},
    birthday: {type: String, required: true},
    simpleBirthdayDate: {type: String, required: true},
    significant_other: {type: String, required: false},
    anniversary: {type: String, required: false},
    simpleAnniversary: {type: String, required: false},
    notes: {type: String, required: false},
    photo_url: {type: String, required: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  },
    {
    toObject: {virtuals: true},
    toJSON: {virtuals: true }
  }
)

// virtual property for age that will be updated as each year passes
// as per inputted birthdate
familyMemberSchema.virtual('age').get(function() {

   let birthday = moment(this.birthday);
   let ageDifMs = Date.now() - birthday;
   let ageDate = new Date(ageDifMs);
   let age = Math.abs(ageDate.getUTCFullYear() - 1970);
   return age;
});

familyMemberSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    relation: this.relation,
    age: this.age,
    birthday: this.birthday,
    simpleBirthdayDate: this.simpleBirthdayDate,
    significant_other: this.significant_other,
    anniversary: this.anniversary,
    simpleAnniversary: this.simpleAnniversary,
    notes: this.notes,
    photo_url: this.photo_url
  }
}

const FamilyMember =  mongoose.model('FamilyMember', familyMemberSchema);

module.exports = {FamilyMember};

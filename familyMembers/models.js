'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const familyMemberSchema = mongoose.Schema({
    name: {type: String, required: true},
    relation: {type: String, required: true},
    birthday: {type: Date, required: true},
    significant_other: {type: String, required: false},
    anniversary: {type: Date, required: false},
    notes: {type: String, required: false},
    photo_url: {type: String, required: true},
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
     let ageDifMs = Date.now() - this.birthday.getTime();
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
    significant_other: this.significant_other,
    anniversary: this.anniversary,
    notes: this.notes,
    photo_url: this.photo_url
  }
}

const FamilyMember =  mongoose.model('FamilyMember', familyMemberSchema);

module.exports = {FamilyMember};

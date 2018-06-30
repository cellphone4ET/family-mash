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
    photo_url: {type: String, required: true}
  }
)

//virtual property for Age--moments.js
//edit main.js to insert photo URL of default icon (TBA) if no photo provided)

// familyMemberSchema.virtual('age').get(function) {
//   let age = moment(this.birthday).get
// }

familyMemberSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    relation: this.relation,
    // age: this._age,
    birthday: this.birthday,
    significant_other: this.significant_other,
    anniversary: this.anniversary,
    notes: this.notes,
    photo_url: this.photo_url
  }
}

const FamilyMember =  mongoose.model('FamilyMember', familyMemberSchema);

module.exports = {FamilyMember};

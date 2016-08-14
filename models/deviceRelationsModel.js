/**
 * Created by khaled on 5/28/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var validateEmail = function(email) {
  var regularExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regularExpression.test(email);
};

/*
 * Defining User Schema with name(as Required Field), age(with Minimum and Maximum values),
 * gender (which is ENUM, so it can be MALE or FEMALE only) and last one is email (which
 * will match the provided regex.)
 * */
var RelationSchema = new Schema({
  IP: {
    type: String,
    required: true,
    index: true,
    unique: true,
    match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  },
  DomeIP:{
    type: String,
    required: true,
    match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  },
  NurseID:{
    type: String,
    trim: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  createdOn:{
    type: String
  },
  updatedOn:{
    type: String
  }
});

RelationSchema.plugin(timestamps);
module.exports = mongoose.model('DeviceRelations', RelationSchema);
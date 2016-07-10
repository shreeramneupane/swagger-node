'use strict';

var fs = require('fs');
var path = require('path');

// Bring Mongoose into the app
var mongoose = require('mongoose');

// Build the connection string
var dbURI = process.env.DB_URI;

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


// BRING IN YOUR ALL SCHEMAS & MODELS
fs
.readdirSync(__dirname)
.filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== path.basename(module.filename)) && (file.slice(-3) === '.js');
})
.forEach(function (file) {
  require('./' + file);
});
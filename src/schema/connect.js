var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = '127.0.0.1';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});

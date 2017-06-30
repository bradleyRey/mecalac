var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://<inigo-brad>:<indigo_river>@ds141232.mlab.com:41232/mecalac';


// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  if(err){
    return console.log(err);
  }
  console.log("Connected successfully to server");

  db.close();
});


db.insertMany

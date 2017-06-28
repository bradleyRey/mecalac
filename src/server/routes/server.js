
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors')
var app        = express();
var mongodb   = require('mongodb');
const MongoClient = require('mongodb').MongoClient;



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3010;


var db;

//connect to DB using MongoDB
MongoClient.connect('mongodb://localhost:27017/db', (err, database) => {
  if (err) return console.log(err)
  db = database;
});








//this is to eventually be a mongodb
//this also needs to include all the users leads and other info
const userData = [
  {"username": "brad", "password": "password", "dealerid": "1"},
  {"username": "jay", "password": "password1", "dealerid": "2"},
  {"username": "balgownie", "password": "password1", "dealerid": "3" },
  {"username": "ces", "password": "password1"},
  {"username": "chippendalerussells", "password": "password1"},
  {"username": "cps", "password": "password1"},
  {"username": "dobsons", "password": "password1"},
  {"username": "ems", "password": "password1"},
  {"username": "kellands", "password": "password1"},
  {"username": "ldhcambrian", "password": "password1"},
  {"username": "murley", "password": "password1"},
  {"username": "norwest", "password": "password1"},
  {"username": "overseas", "password": "password1"},
  {"username": "press", "password": "password1"},
  {"username": "promac", "password": "password1"},
  {"username": "riverlea", "password": "password1"},
  {"username": "scotia", "password": "password1"},
  {"username": "sleator", "password": "password1"},
  {"username": "thwhite", "password": "password1"},
  {"username": "willowbrook", "password": "password1"},
]

app.post('/api',function(req,res){
  var resp = 'false';
  userData.forEach( (element) => {
    if((element.username == req.body.username) && (element.password == req.body.password)){
      resp = {
        auth: 'true',
        userdata: element
      }
    }
  })
  res.status('201').send(resp);
  res.end()
});


app.post('/api/getLeads',function(req,res){

  db.collection('leads').find().toArray((err, results) => {
    console.log(results)
    res.send(results)
  })

})
app.post('/api/getLeadsById',function(req,res){
  console.log(req.body)
  var dealerid = req.body.DealerId
  dealerid = parseInt(dealerid)
  var query = {
    DealerId: dealerid
  }
  db.collection('leads').find(query).toArray((err, results) => {
    console.log('sd')
    console.log(results);
    res.send(results);

  });
});

//starting server
app.listen(port);
console.log('server is working on: ' + port);

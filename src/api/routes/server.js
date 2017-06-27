
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors')
var app        = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3010;

//this is to eventually be a mongodb
//this also needs to include all the users leads and other info
const userData = [
  {"username": "brad", "password": "password"},
  {"username": "jay", "password": "password1"}
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

//starting server
app.listen(port);
console.log('server is working on: ' + port);

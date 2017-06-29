
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors')
var app        = express();
var mongodb   = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db;

//connect to DB using MongoDB
mongodb.MongoClient.connect('mongodb://indigo-brad:indigo_river@ds141232.mlab.com:41232/mecalac', (err, database) => {
  if (err) {
    console.log(err)
    process.exit(1);
  }
  db = database;
  console.log('Database connection is ready')

  var server= app.listen(process.env.PORT || 3010, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
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

//Helper functions below
function getSingleLeadById(leadid){
  leadid = parseInt(leadid)
  var query = {
    Lead_Id: leadid
  }
  return db.collection('leads').find(query).toArray()
}


//API endpoints below
app.post('/api/login',function(req,res){
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
    res.send(results)
  })
});

app.post('/api/getLeadsById',function(req,res){
  var dealerid = req.body.dealerid
  dealerid = parseInt(dealerid)
  var query = {
    DealerId: dealerid
  }
  db.collection('leads').find(query).toArray((err, results) => {
    res.send(results);
  });
});
app.post('/api/getDealerNames',function(req,res){
  db.collection('userData').find().toArray((err,resultNames)=>{
  //  console.log(resultNames)
    dealerStore=[]
    for(i=0; i<resultNames.length; i++){
      dealerStore.push(resultNames[i].username)
    }
    
    console.log(dealerStore)

      //console.log(dealerStore,'djfskdjn')
    //console.log(dealNames)
    //make empty array
    //loop throigh results
    //push names to array
  })
})

app.post('/api/getSingleLeadById',function(req,res){
  var leadid = req.body.leadid
  leadid = parseInt(leadid)
  var query = {
    Lead_Id: leadid
  }
  db.collection('leads').find(query).toArray((err, results) => {
    res.send(results);


  });
});




app.post('/api/updateLead',function(req,res){
  var leadid = req.body.leadid
  var updateType = req.body.updateType
  leadid = parseInt(leadid)
  const updateData = req.body.updateData
  console.log(updateData)
  getSingleLeadById(leadid).then(resp => {
    if(resp.length > 0){
      console.log(resp)
      console.log('ARR')
      resp[0].Status = updateData;
      //mark each relevant update as complete
      if(updateType == 'update1'){
        resp[0].Status.update1.complete == true
      }
      if(updateType == 'update2'){
        resp[0].Status.update2.complete == true
      }
      if(updateType == 'update3'){
        resp[0].Status.update3.complete == true
        resp[0].Status.leadComplete == true
      }
      var dbz = db.collection('leads').update({Lead_Id: leadid}, resp[0], true, function(err, result){
        if(!err){
          res.send({
            success: true,
            newState: resp[0]
          });
        }else{
          //if error, send back original data
          res.send({
            success: false,
            error: 'There seems to be a database issue - please contact us.'
          });
        }
      })
    }else{
      res.send({
        success: false,
        error: 'There seems to be something wrong, please try again.'
      })
    }
  })
})

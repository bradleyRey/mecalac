var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors')
var app         = express();
var mongodb     = require('mongodb');
var path        = require('path');

const MongoClient = require('mongodb').MongoClient;

//app.use(express.static(path.resolve(__dirname, '../../../', 'build')));
/*app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../', 'build', 'index.html'));
});
*/
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
  db.collection('userData').find().toArray((err, results) => {
    results.forEach( (element) => {
      if((element.username == req.body.username) && (element.password == req.body.password)){
        resp = {
          auth: 'true',
          userdata: element
        }
      }
    })
    res.status('201').send(resp);
    res.end()
  })
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
  getSingleLeadById(leadid).then(resp => {
    if(resp.length > 0){
      //mark each relevant update as complete
      if(updateType == 'update1'){
        updateData.update1.complete = 'true'
      }
      if(updateType == 'update2'){
        updateData.update2.complete = 'true'
      }
      if(updateType == 'completeLead'){
        updateData.update3.complete = 'true'
        updateData.leadComplete = 'true'
      }
      resp[0].Status = updateData;
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

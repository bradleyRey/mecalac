import axios from 'axios';
import * as data from '../server/leads.json'

class LeadsApi {

  static getLeads(dealerid, callback){
    axios.post(`http://localhost:3010/api`, {dealerid: dealerid})
      .then( response => {
        setTimeout(function(){
          //return callback(response)
          return callback(data)
        },2000)
      })
  }
  static getLeadById(dealerid, callback){
    axios.post(`http://localhost:3010/api/getLeadById`, {DealerId: dealerid})
      .then( response => {
        setTimeout(function(){
          //return callback(response)
          return callback(response)
        },2000)
      })
  }

  static submitLead(dealerid, updateType, update, callback){

    return callback(true)
    /*
    axios.post(`http://localhost:3010/api/updateLead`, {leadid: leadid})
      .then( response => {
        setTimeout(function(){
          return callback(response)
        },2000)
      })*/
  }


}

export default LeadsApi

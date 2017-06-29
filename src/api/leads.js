import axios from 'axios';
import * as data from '../server/leads.json'

class LeadsApi {

  static getLeads(dealerid, callback){
    axios.post(`http://localhost:3010/api/getLeadsById`, {dealerid: dealerid})
      .then( response => {
        setTimeout(function(){
          console.log()
          return callback(response)
        },2000)
      })
  }
  static getLeadById(dealerid, callback){
    console.log(dealerid)
    const theObj = {
      currentStatus: {
        update1: {
          date: 'sada',
          activity: 'sadas',
          nextAction: 'sada',
          complete: false
        },
        update2:{
          date: '',
          activity: '',
          nextAction: '',
          complete: false
        },
        update3: {
          date: '',
          activity: '',
          nextAction: '',
          closing: '',
          complete: false
        },
        leadComplete: false
      }
    }
    return callback(theObj);

    /*
    axios.post(`http://localhost:3010/api/getLeadById`, {DealerId: dealerid})
      .then( response => {
        setTimeout(function(){
          //return callback(response)
          return callback(response)
        },2000)
      })
      */
  }

  static submitLead(dealerid, updateType, update, callback){
    const theObj = {
      success: true,
      currentStatus: {
        update1: {
          date: 'sada',
          activity: 'sadas',
          nextAction: 'sada',
          complete: true
        },
        update2:{
          date: '',
          activity: '',
          nextAction: '',
          complete: true
        },
        update3: {
          date: '',
          activity: '',
          nextAction: '',
          closing: '',
          complete: true
        },
        leadComplete: true
      }
    }
    return callback(theObj);
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

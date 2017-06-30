import axios from 'axios';

class LeadsApi {

  static getLeads(dealerid, callback){
    axios.post(`http://localhost:3010/api/getLeadsById`, {dealerid: dealerid})
      .then( response => {
        return callback(response)
      })
  }
  static getLeadById(leadid, callback){
    axios.post(`http://localhost:3010/api/getSingleLeadById`, {leadid: leadid})
      .then( response => {
        return callback(response)
      })
  }

  static submitLead(leadid, updateType, updateData, callback){
    axios.post(`http://localhost:3010/api/updateLead`, {leadid: leadid, updateData: updateData, updateType: updateType})
    .then( response => {
      return callback(response)
    })
  }

  static viewDealers(callback){
    axios.post('http://localhost:3010/api/getDealerNames')
    .then( response => {
      return callback(response)
    })
  }
}

export default LeadsApi

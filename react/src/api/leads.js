import axios from 'axios';

class LeadsApi {

  static getLeads(dealerid, callback){
    axios.post(`/api/getLeadsById`, {dealerid: dealerid})
      .then( response => {
        return callback(response)
      })
  }
  static getLeadById(leadid, callback){
    axios.post(`/api/getSingleLeadById`, {leadid: leadid})
      .then( response => {
        return callback(response)
      })
  }

  static submitLead(leadid, updateType, updateData, callback){
    axios.post(`/api/updateLead`, {leadid: leadid, updateData: updateData, updateType: updateType})
      .then( response => {
        return callback(response)
      })
  }

  static viewDealers(callback){
    axios.post('/api/getDealerNames')
      .then( response => {
        return callback(response)
      })
  }
}

export default LeadsApi

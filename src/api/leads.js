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
}

export default LeadsApi

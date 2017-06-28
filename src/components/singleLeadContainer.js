import React, { Component } from 'react';
import DashboardHeaderComponent from './dashboardHeaderComponent'
import '../App.css';
import DashboardContainer from './dashboardContainer'
import TitleAboveTable from './dashboardContainer'

import * as data from '../server/leads.json'

class SingleLeadComponent extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

    render() {
        return(
          <div>
              <DashboardHeaderComponent />
              <div className="maxWidth">
                <NewTableLead />
              </div>
          </div>
        );
      }
     }


     const NewTableLead = () => (
       <div>
         <table className='viewLeadTable'>
          <tr className='TableHeaderSingle'>
            <th className='cellBorder'></th>
            <th className='cellBorder'>Date</th>
            <th className='cellBorder'>Task Taken Place</th>
            <th className='cellBorder'>Next Action Requirements</th>
            <th></th>
          </tr>
          <tr>
            <td>
              <div className='updateBlock'>UPDATE1</div>
            </td>
            <td>
              <input type="text" ref={(dateField) => this.dateField = dateField} />
            </td>
            <td>
              <input type="text" ref={(activityField) => this.activityField = activityField} />
            </td>
            <td>
              <input type="text" ref={(nextField) => this.nextField = nextField} />
            </td>
            <td className="center">
              <button className='btn updateBtn'>Submit update</button>
            </td>
          </tr>
         </table>
       </div>
     )



export default SingleLeadComponent
